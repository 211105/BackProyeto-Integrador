import { query } from "../../../../database/connection";

export async function isEmailRegistered(email: string): Promise<boolean> {
    const checkEmailSql = `
        SELECT COUNT(*) as emailCount
        FROM drivers
        WHERE email = ?;
    `;
    const [emailResults]: any = await query(checkEmailSql, [email]);
    return emailResults[0].emailCount > 0;
}
//Verifica si el UUID del OWNER existe 
export async function isOwnerUUIDRegistered(ownerUUID: string): Promise<boolean> {
    const checkOwnerUUIDSql = `
        SELECT COUNT(*) as ownerCount
        FROM owners
        WHERE uuid = ?;
    `;
    const [ownerResults]: any = await query(checkOwnerUUIDSql, [ownerUUID]);
    return ownerResults[0].ownerCount > 0;
}