import { query } from "../../database/connection";
import { Weeklyamount,createWeekly } from "../domain/weekly_amount";
import { Weekly_amountRepository } from "../domain/weekly_amountRepository";

export class MysqlWeeklyAmountRepository implements Weekly_amountRepository{

    async createWeeklyAmount(uuid: string, user_uuid: string, amount: number, amount_update: number,status: boolean): Promise<string | Error | createWeekly | null> {
        try {
           
            let sql = "INSERT INTO weekly_amount(uuid, user_uuid, amount, amount_update, create_date, end_date, status) VALUES (?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP() + INTERVAL 5 MINUTE, ?)";

            const params: any[] = [uuid, user_uuid, amount, amount_update,status];
            const [result]: any = await query(sql, params);
            return new createWeekly(uuid, user_uuid, amount, amount_update,status);
            
            
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    async getWeeklyAmountByUser(user_uuid: string): Promise<string | Weeklyamount | Error | null> {
        try {
            const sql = "SELECT * FROM weekly_amount WHERE user_uuid = ? AND status = true LIMIT 1";
            const [rows]: any = await query(sql, [user_uuid]);

            // Si no hay registros que coincidan, regresamos null indicando que el libro no fue encontrado
            if (!Array.isArray(rows) || rows.length === 0) {
                return null;
            }

            const row = rows[0]; // Como estamos buscando por ID, sólo debe haber una coincidencia

            const weekly = new Weeklyamount(
                row.uuid,
                row.user_uuid,
                row.amount,
                row.amount_update,
                row.create_date,
                row.end_date,
                row.status,
            );

            return weekly;

        } catch (error) {
            console.error('Error al obtener el :', error);
            return null;
        }
    }
    async updateStatusByUser(user_uuid: string): Promise<string | Weeklyamount | Error | null> {
        try {
            const selectSql = "SELECT uuid, end_date, UTC_TIMESTAMP() FROM weekly_amount WHERE user_uuid = ? AND status = TRUE LIMIT 1";
            const [selectResult]: any = await query(selectSql, [user_uuid]);

            if (!Array.isArray(selectResult) || selectResult.length === 0) {
                return 'No hay registros con el user_uuid y status=true.';
            }

            const row = selectResult[0];
            const endDate = new Date(row.end_date);
            const currentDate = new Date(row['UTC_TIMESTAMP()']); // Cambiado aquí

            if (currentDate > endDate) {
                const updateSql = "UPDATE weekly_amount SET status = FALSE WHERE uuid = ?";
                const [updateResult]: any = await query(updateSql, [row.uuid]);

                if (updateResult.affectedRows > 0) {
                    return 'El estado se actualizó correctamente.';
                } else {
                    return 'No se realizó ninguna actualización.';
                }
            } else {
                return 'El tiempo aún no ha pasado, no se realizó ninguna actualización.';
            }
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            return new Error('Error al actualizar el estado.');
        }
    }
    async updateWeeklyAmount(uuid: string, amount: number): Promise<string | Weeklyamount | Error | null> {
        try {
            // Obtener el total de amount de la tabla expenses para el weekly_amount_uuid dado
            const sumExpenseAmountSql = `
                SELECT COALESCE(SUM(amount), 0) as totalExpenseAmount
                FROM expenses
                WHERE weekly_amount_uuid = ?;
            `;
    
            const [sumExpenseResults]: any = await query(sumExpenseAmountSql, [uuid]);
            const totalExpenseAmount = sumExpenseResults[0].totalExpenseAmount || 0;
    
    
            // Calcular el nuevo valor de amount y amount_update
            const newAmount = amount;
            const newAmountUpdate = newAmount - totalExpenseAmount;
    
            // Actualizar la fila con los nuevos valores
            const updateSql = "UPDATE weekly_amount SET amount = ?, amount_update = ? WHERE uuid = ?";
            const [updateResult]: any = await query(updateSql, [newAmount, newAmountUpdate, uuid]);
    
            if (updateResult.affectedRows > 0) {
                // Obtener la fila actualizada
                const selectSql = "SELECT * FROM weekly_amount WHERE uuid = ?";
                const [selectResult]: any = await query(selectSql, [uuid]);
    
                if (!Array.isArray(selectResult) || selectResult.length === 0) {
                    return 'No se encontró la fila con el UUID proporcionado después de la actualización.';
                }
    
                const updatedRow = selectResult[0];
                const updatedWeekly = new Weeklyamount(
                    updatedRow.uuid,
                    updatedRow.user_uuid,
                    updatedRow.amount,
                    updatedRow.amount_update,
                    updatedRow.create_date,
                    updatedRow.end_date,
                    updatedRow.status
                );
    
                return updatedWeekly;
            } else {
                return 'No se realizó ninguna actualización.';
            }
        } catch (error) {
            console.error('Error al actualizar el monto semanal:', error);
            return new Error('Error al actualizar el monto semanal.');
        }
    }
}