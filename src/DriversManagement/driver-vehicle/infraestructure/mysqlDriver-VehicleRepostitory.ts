import { query } from "../../../database/connection";
import { Driver_Vehicle, RegisterDriverVehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository } from "../domain/driver_vehicleRepository";

export class MysqlDriver_VehicleRepository implements Driver_VehicleRepository {

    async registerDriver_Vehicle(uuid: string, driver_uuid: string, vehicle_uuid: string, status: boolean): Promise<RegisterDriverVehicle | null | string | Error> {
        try {
            const driverInfoSql = `SELECT * FROM drivers WHERE uuid = ?;`;
            const [driverInfo]: any = await query(driverInfoSql, [driver_uuid]);

            const vehicleInfoSql = `SELECT * FROM vehicles WHERE uuid = ?;`;
            const [vehicleInfo]: any = await query(vehicleInfoSql, [vehicle_uuid]);

            let sql = "INSERT INTO drivers_vehicles(uuid, driver_uuid, vehicle_uuid, status) VALUES (?, ?, ?, ?)";
            const params: any[] = [uuid, driver_uuid, vehicle_uuid, status];

            console.log("Executing SQL query:", sql, "with parameters:", params);

            const [result]: any = await query(sql, params);

            sql = "UPDATE drivers SET status_moto_selection = true WHERE uuid = ?";
            await query(sql, [driver_uuid]);

            sql = "UPDATE vehicles SET status_driver_selection = true WHERE uuid = ?";
            await query(sql, [vehicle_uuid]);

            const driverVehicleData = new Driver_Vehicle(uuid, driver_uuid, vehicle_uuid, status);

            return new RegisterDriverVehicle(uuid, driver_uuid, vehicle_uuid, status, driverInfo[0], vehicleInfo[0]);
        } catch (error) {
            console.error("Error executing SQL query:", error);
            return error as Error;
        }
    }

    async deleteRegisterDV(uuid: string): Promise<string | RegisterDriverVehicle | Error | null> {
        console.log(uuid);
        try {
            const [recordData]: any = await query('SELECT driver_uuid, vehicle_uuid FROM drivers_vehicles WHERE uuid = ?', [uuid]);

            if (!recordData || recordData.length === 0) {
                return "El registro con el UUID especificado no existe.";
            }

            const [driverData]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [recordData[0].driver_uuid]);
            const [vehicleData]: any = await query('SELECT * FROM vehicles WHERE uuid = ?', [recordData[0].vehicle_uuid]);

            const deleteSql = "DELETE FROM drivers_vehicles WHERE uuid = ?";
            const deleteParams: any[] = [uuid];

            console.log("Executing SQL query:", deleteSql, "with parameters:", deleteParams);

            const [deleteResult]: any = await query(deleteSql, deleteParams);

            if (driverData && driverData.length > 0) {
                try {
                    const updateDriverSql = "UPDATE drivers SET status_moto_selection = false WHERE uuid = ?";
                    await query(updateDriverSql, [recordData[0].driver_uuid]);
                } catch (error) {
                    console.error("Error updating driver status:", error);
                    return error as Error;
                }
            }

            if (vehicleData && vehicleData.length > 0) {
                try {
                    const updateVehicleSql = "UPDATE vehicles SET status_driver_selection = false WHERE uuid = ?";
                    await query(updateVehicleSql, [recordData[0].vehicle_uuid]);
                } catch (error) {
                    console.error("Error updating vehicle status:", error);
                    return error as Error;
                }
            }

            if (deleteResult.affectedRows > 0) {
                return "El registro y sus asociaciones se han actualizado correctamente.";
            } else {
                return "El registro con el UUID especificado no existe en la tabla drivers_vehicles.";
            }
        } catch (error) {
            console.error("Error executing SQL query:", error);
            return error as Error;
        }
    }
}
