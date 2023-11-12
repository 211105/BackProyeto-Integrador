import { query } from "../../../database/connection";

export async function isEmailRegistered(email: string): Promise<boolean> {
    const checkEmailSql = `
        SELECT COUNT(*) as emailCount
        FROM drivers
        WHERE email = ?;
    `;
    const [emailResults]: any = await query(checkEmailSql, [email]);
    return emailResults[0].emailCount > 0;
}
