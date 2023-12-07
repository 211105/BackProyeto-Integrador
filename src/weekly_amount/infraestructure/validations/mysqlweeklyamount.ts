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

export async function verifyWeeklyAmount(uuid: string, userAmountString: string): Promise<boolean> {
    try {
        // Verifica si el UUID de weekly_amount existe
        const weeklyAmountUuidRegistered = await isWeeklyAmountUuidRegistered(uuid);
        if (!weeklyAmountUuidRegistered) {
            return false;
        }

        // Suma los valores de amount de la tabla expense para el weekly_amount_uuid dado
        const sumExpenseAmountSql = `
            SELECT SUM(amount) as totalExpenseAmount
            FROM expenses
            WHERE weekly_amount_uuid = ?;
        `;

        const [sumExpenseResults]: any = await query(sumExpenseAmountSql, [uuid]);
        const totalExpenseAmountString = sumExpenseResults[0].totalExpenseAmount || "0";

        // Convertir la suma de gastos a un número
        const totalExpenseAmount = Number(totalExpenseAmountString);

        // Convertir la cantidad del usuario a un número
        const userAmount = Number(userAmountString);

        // Compara con el amount proporcionado por el usuario
        console.log(totalExpenseAmount);
        console.log(userAmount);

        return totalExpenseAmount > userAmount;
    } catch (error) {
        console.error("Error during weekly_amount verification:", error);
        throw new Error("Error during weekly_amount verification");
    }
}