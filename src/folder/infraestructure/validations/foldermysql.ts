import { query } from "../../../database/connection";

export async function isUserUuidRegistered(user_uuid: string): Promise<boolean> {
    const checkUserUuidSql = `
        SELECT COUNT(*) as user_uuidCount
        FROM users
        WHERE uuid = ?;
    `;

    const [userUuidResults]: any = await query(checkUserUuidSql, [user_uuid]);

    return userUuidResults[0].userUuidCount > 0;
}
