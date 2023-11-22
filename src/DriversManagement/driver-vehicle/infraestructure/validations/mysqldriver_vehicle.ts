import { query } from "../../../../database/connection";

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

// Función para verificar si el UUID del vehículo existe en la base de datos
export async function doesVehicleExist(uuid: string): Promise<boolean> {
    try {
        const checkVehicleSql = `
            SELECT COUNT(*) as vehicleCount
            FROM vehicles
            WHERE uuid = ?;
        `;

        const [vehicleResults]: any = await query(checkVehicleSql, [uuid]);
        return vehicleResults[0].vehicleCount > 0;
    } catch (error) {
        console.error("Error during vehicle existence check:", error);
        throw new Error("Error during vehicle existence check");
    }
}

export async function statusDriver(vehicle_uuid: string): Promise<boolean> {
    try {
        const checkDriverSql = `
            SELECT COUNT(*) as driverCount
            FROM drivers
            WHERE uuid = (
                SELECT driver_uuid
                FROM drivers_vehicles
                WHERE vehicle_uuid = ?
            ) AND status_moto_selection = false;
        `;

        const [driverResults]: any = await query(checkDriverSql, [vehicle_uuid]);

        return driverResults[0].driverCount > 0;
    } catch (error) {
        console.error("Error during vehicle existence check:", error);
        throw new Error("Error during vehicle existence check");
    }
}

export async function statusVehicle(driver_uuid: string): Promise<boolean> {
    try {
        const checkVehicleSql = `
            SELECT COUNT(*) as vehicleCount
            FROM vehicles
            WHERE uuid = ? AND status_driver_selection = false;
        `;

        const [vehicleResults]: any = await query(checkVehicleSql, [driver_uuid]);

        return vehicleResults[0].vehicleCount > 0;
    } catch (error) {
        console.error("Error during vehicle existence check:", error);
        throw new Error("Error during vehicle existence check");
    }
}


