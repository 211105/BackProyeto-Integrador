import { query } from "../../../../database/connection";

export async function isPlateNumberRegistered(plateNumber: string): Promise<boolean> {
    const checkPlateNumberSql = `
        SELECT COUNT(*) as plateNumberCount
        FROM vehicles
        WHERE plate_number = ?;
    `;
    const [plateNumberResults]: any = await query(checkPlateNumberSql, [plateNumber]);
    return plateNumberResults[0].plateNumberCount > 0;
}

export async function isDriverUuidRegistered(driverUuid: string): Promise<boolean> {
    const checkDriverUuidSql = `
        SELECT COUNT(*) as driverUuidCount
        FROM drivers
        WHERE uuid = ?;
    `;
    const [driverUuidResults]: any = await query(checkDriverUuidSql, [driverUuid]);
    return driverUuidResults[0].driverUuidCount > 0;
}