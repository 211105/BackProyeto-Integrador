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

// Función para verificar si el owner_uuid ya está registrado
export async function isOwnerUuidRegistered(ownerUuid: string): Promise<boolean> {
    try {
        const checkOwnerUuidSql = `
            SELECT COUNT(*) as ownerUuidCount
            FROM drivers
            WHERE owner_uuid = ?;
        `;

        const [ownerUuidResults]: any = await query(checkOwnerUuidSql, [ownerUuid]);
        return ownerUuidResults[0].ownerUuidCount > 0;
    } catch (error) {
        console.error("Error during owner_uuid registration check:", error);
        throw new Error("Error during owner_uuid registration check");
    }
}

// Función para verificar si el identification_number ya está registrado
export async function isIdentificationNumberRegistered(identificationNumber: string): Promise<boolean> {
    try {
        const checkIdentificationNumberSql = `
            SELECT COUNT(*) as identificationNumberCount
            FROM drivers
            WHERE identification_number = ?;
        `;

        const [identificationNumberResults]: any = await query(checkIdentificationNumberSql, [identificationNumber]);
        return identificationNumberResults[0].identificationNumberCount > 0;
    } catch (error) {
        console.error("Error during identification_number registration check:", error);
        throw new Error("Error during identification_number registration check");
    }
}
// Función para obtener datos específicos de la tabla drivers para un usuario específico
export async function getDriverDataByUuid(uuid: string): Promise<{ name: string, surname: string, second_surname: string, identification_number: string } | null> {
    try {
        const getDriverDataSql = `
            SELECT name, surname, second_surname, identification_number
            FROM drivers
            WHERE uuid = ?;
        `;

        const [driverDataResults]: any = await query(getDriverDataSql, [uuid]);

        if (driverDataResults.length > 0) {
            const row = driverDataResults[0];
            return {
                name: row.name,
                surname: row.surname,
                second_surname: row.second_surname,
                identification_number: row.identification_number,
            };
        } else {
            return null; // Si el usuario con el uuid dado no se encuentra en la base de datos
        }
    } catch (error) {
        console.error("Error during driver data retrieval:", error);
        throw new Error("Error during driver data retrieval");
    }
}

// Función para verificar si el uuid del conductor existe en la base de datos
export async function doesDriverExist(uuid: string): Promise<boolean> {
    try {
        const checkDriverSql = `
            SELECT COUNT(*) as driverCount
            FROM drivers
            WHERE uuid = ?;
        `;

        const [driverResults]: any = await query(checkDriverSql, [uuid]);
        return driverResults[0].driverCount > 0;
    } catch (error) {
        console.error("Error during driver existence check:", error);
        throw new Error("Error during driver existence check");
    }
}