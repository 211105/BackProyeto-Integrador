import { query } from "../../../database/connection";

export async function isWeeklyAmountUuidRegistered(weeklyAmountUuid: string): Promise<boolean> {
    try {
        const checkWeeklyAmountUuidSql = `
            SELECT COUNT(*) as weeklyAmountUuidCount
            FROM weekly_amount
            WHERE uuid = ?;
        `;

        const [weeklyAmountUuidResults]: any = await query(checkWeeklyAmountUuidSql, [weeklyAmountUuid]);
        return weeklyAmountUuidResults[0].weeklyAmountUuidCount > 0;
    } catch (error) {
        console.error("Error during weekly_amount_uuid registration check:", error);
        throw new Error("Error during weekly_amount_uuid registration check");
    }
}

export async function isAmountUpdateValid(weeklyAmountUuid: string, userAmount: number): Promise<boolean> {
    try {
        const getAmountUpdateSql = `
            SELECT amount_update
            FROM weekly_amount
            WHERE uuid = ?;
        `;
        const [amountUpdateResults]: any = await query(getAmountUpdateSql, [weeklyAmountUuid]);

        if (!amountUpdateResults || amountUpdateResults.length === 0) {
            throw new Error("No se encontró el registro correspondiente en la tabla weekly_amount.");
        }

        const { amount_update: currentAmountUpdate } = amountUpdateResults[0];
        const result = currentAmountUpdate - userAmount;

        return result >= 0; // Retorna true si la resta es mayor o igual a 0, false si es menor a 0.
    } catch (error) {
        console.error("Error during amount update validation:", error);
        throw new Error("Error during amount update validation");
    }
}

export async function isAmountUpdateValited(expenseUuid: string, userAmount: number): Promise<boolean> {
    try {
        // Obtener el UUID de weekly_amount asociado con el gasto
        let getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
        const getWeeklyAmountUuidParams: any[] = [expenseUuid];
        const [weeklyAmountUuidResult]: any = await query(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);

        const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;

        // Obtener el valor de amount_update en la tabla weekly_amount
        let getAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
        const getAmountUpdateParams: any[] = [weeklyAmountUuid];
        const [amountUpdateResult]: any = await query(getAmountUpdateSql, getAmountUpdateParams);

        const amountUpdate = parseFloat(amountUpdateResult[0].amount_update); // Convertir a número
        console.log(amountUpdate)

        // Obtener el valor de amount en la tabla expenses
        let getAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
        const getAmountParams: any[] = [expenseUuid];
        const [amountResult]: any = await query(getAmountSql, getAmountParams);

        const amount = parseFloat(amountResult[0].amount); // Convertir a número
        console.log(amount)

        // Verificar si los valores son numéricos válidos después de la conversión
        if (isNaN(amount) || isNaN(amountUpdate)) {
            throw new Error("Invalid numeric values for the validation.");
        }

        // Calcular la suma de amount y amount_update
        const sumResult = amount + amountUpdate;
        console.log(sumResult)

        // Verificar si la resta es mayor o igual a 0
        const difference = sumResult - userAmount;
        console.log(difference)
        
        return difference >= 0;
    } catch (error) {
        console.error("Error during amount update validation:", error);
        throw new Error("Error during amount update validation");
    }
}