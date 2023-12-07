import { query } from "../../database/connection";
import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";

export class MysqlExpenseRepository implements ExpenseRepository {

    async createExpense(uuid: string, weekly_amount_uuid: string, category: string, amount: number): Promise<string | Expense | Error | null> {
        try {
            // Insertar el gasto en la tabla de expenses
            let expenseSql = "INSERT INTO expenses(uuid, weekly_amount_uuid, category, amount) VALUES (?, ?, ?, ?)";
            const expenseParams: any[] = [uuid, weekly_amount_uuid, category, amount];
            await query(expenseSql, expenseParams);

            // Actualizar el campo amount_update en la tabla weekly_amount restando amount
            let updateSql = "UPDATE weekly_amount SET amount_update = amount_update - ? WHERE uuid = ?";
            const updateParams: any[] = [amount, weekly_amount_uuid];
            await query(updateSql, updateParams);

            // Devolver el objeto Expense con el nuevo valor de amount_update
            return new Expense(uuid, weekly_amount_uuid, category, amount);
        } catch (error) {
            console.error("Error adding expense:", error);
            return error as Error;
        }
    }

    async updateAmountExpense(uuid: string, amount: number): Promise<string | Expense | Error | null> {
        try {
            // Obtener el UUID de weekly_amount asociado con el gasto
            let getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
            const getWeeklyAmountUuidParams: any[] = [uuid];
            const [weeklyAmountUuidResult]: any = await query(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);

            const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;

            // Obtener el valor anterior de amount en la tabla expenses
            let getPreviousAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
            const getPreviousAmountParams: any[] = [uuid];
            const [previousAmountResult]: any = await query(getPreviousAmountSql, getPreviousAmountParams);

            const previousAmount = parseFloat(previousAmountResult[0].amount); // Convertir a número
            console.log(previousAmount)

            // Obtener el valor actual de amount_update en la tabla weekly_amount
            let getCurrentAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
            const getCurrentAmountUpdateParams: any[] = [weeklyAmountUuid];
            const [currentAmountUpdateResult]: any = await query(getCurrentAmountUpdateSql, getCurrentAmountUpdateParams);

            const currentAmountUpdate = parseFloat(currentAmountUpdateResult[0].amount_update); // Convertir a número
            console.log(currentAmountUpdate)

            // Verificar si los valores son numéricos válidos después de la conversión
            if (isNaN(previousAmount) || isNaN(currentAmountUpdate)) {
                throw new Error("Invalid numeric values for the sum.");
            }

            // Sumar el valor anterior de amount con el campo amount_update en la tabla weekly_amount
            const newAmountUpdate = previousAmount + currentAmountUpdate;
            console.log(newAmountUpdate)


            // Actualizar el campo amount_update en la tabla weekly_amount
            let updateAmountUpdateSql = "UPDATE weekly_amount SET amount_update = ? WHERE uuid = ?";
            const updateAmountUpdateParams: any[] = [newAmountUpdate, weeklyAmountUuid];
            await query(updateAmountUpdateSql, updateAmountUpdateParams);

            // Actualizar el campo amount en la tabla expenses
            let updateSql = "UPDATE expenses SET amount = ? WHERE uuid = ?";
            const updateParams: any[] = [amount, uuid];
            await query(updateSql, updateParams);

            // Obtener el objeto Expense actualizado
            let getExpenseSql = "SELECT * FROM expenses WHERE uuid = ?";
            const getExpenseParams: any[] = [uuid];
            const [updatedExpenseResult]: any = await query(getExpenseSql, getExpenseParams);

            const updatedExpense = updatedExpenseResult[0];

            // Restar el nuevo amount al campo amount_update en la tabla weekly_amount
            let updateAmountUpdateAfterExpenseSql = "UPDATE weekly_amount SET amount_update = amount_update - ? WHERE uuid = ?";
            const updateAmountUpdateAfterExpenseParams: any[] = [amount, weeklyAmountUuid];
            await query(updateAmountUpdateAfterExpenseSql, updateAmountUpdateAfterExpenseParams);

            // Devolver el objeto Expense actualizado
            return new Expense(updatedExpense.uuid, weeklyAmountUuid, updatedExpense.category, updatedExpense.amount);
        } catch (error) {
            console.error("Error updating expense amount:", error);
            return error as Error;
        }
    }

    async deleteExpenseByUuid(uuid: string): Promise<string | Expense | Error | null> {
        try {
            // Obtener el UUID de weekly_amount asociado con el gasto
            const getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
            const getWeeklyAmountUuidParams: any[] = [uuid];
            const [weeklyAmountUuidResult]: any = await query(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);
    
            const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;
    
            // Obtener el valor actual de amount en la tabla expenses
            const getAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
            const getAmountParams: any[] = [uuid];
            const [amountResult]: any = await query(getAmountSql, getAmountParams);
    
            const amount = parseFloat(amountResult[0].amount); // Convertir a número
    
            // Obtener el valor actual de amount_update en la tabla weekly_amount
            const getCurrentAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
            const getCurrentAmountUpdateParams: any[] = [weeklyAmountUuid];
            const [currentAmountUpdateResult]: any = await query(getCurrentAmountUpdateSql, getCurrentAmountUpdateParams);
    
            const currentAmountUpdate = parseFloat(currentAmountUpdateResult[0].amount_update); // Convertir a número
    
            // Verificar si los valores son numéricos válidos después de la conversión
            if (isNaN(amount) || isNaN(currentAmountUpdate)) {
                throw new Error("Invalid numeric values for the update.");
            }
    
            // Suma el valor de amount al campo amount_update en la tabla weekly_amount
            const newAmountUpdate = currentAmountUpdate + amount;
    
            // Actualizar el campo amount_update en la tabla weekly_amount
            const updateAmountUpdateSql = "UPDATE weekly_amount SET amount_update = ? WHERE uuid = ?";
            const updateAmountUpdateParams: any[] = [newAmountUpdate, weeklyAmountUuid];
            await query(updateAmountUpdateSql, updateAmountUpdateParams);
    
            // Eliminar la nota de la base de datos después de la actualización en weekly_amount
            const deleteSql = "DELETE FROM expenses WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            await query(deleteSql, deleteParams);
    
            return "El gasto se ha eliminado correctamente, y la suma en weekly_amount se ha actualizado.";
        } catch (error) {
            console.error("Error deleting expense:", error);
            return error as Error;
        }
    }
    async getExpensesByWeekly(weekly_amount_uuid: string): Promise<string | Error | Expense[] | null> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM expenses WHERE weekly_amount_uuid = ?";
            const params: any[] = [weekly_amount_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const expenses = result.map((row: any) => {
                    return new Expense(
                        row.uuid,
                        row.weekly_amount_uuid,
                        row.category,
                        row.amount,  
                    );
                });

                return expenses;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving files by expenses:", error);
            return error as Error;
        }
    }
}
