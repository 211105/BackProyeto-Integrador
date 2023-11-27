import { query } from "../../../database/connection";
import { Driver_Vehicle,RegisterDriverVehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository } from "../domain/driver_vehicleRepository";

export class MysqlDriver_VehicleRepository implements Driver_VehicleRepository {

    async registerDriver_Vehicle(uuid: string, driver_uuid: string, vehicle_uuid: string, status: boolean): Promise<RegisterDriverVehicle | null | string | Error> {
        try {
            // Obtener información del conductor
            const driverInfoSql = `
                SELECT * FROM drivers WHERE uuid = ?;
            `;
            const [driverInfo]: any = await query(driverInfoSql, [driver_uuid]);

            // Obtener información del vehículo
            const vehicleInfoSql = `
                SELECT * FROM vehicles WHERE uuid = ?;
            `;
            const [vehicleInfo]: any = await query(vehicleInfoSql, [vehicle_uuid]);

            // Insertar en la tabla drivers_vehicles
            let sql = "INSERT INTO drivers_vehicles(uuid, driver_uuid, vehicle_uuid, status) VALUES (?, ?, ?, ?)";
            const params: any[] = [uuid, driver_uuid, vehicle_uuid, status];
            const [result]: any = await query(sql, params);

            // Actualizar status_moto_selection en la tabla drivers
            sql = "UPDATE drivers SET status_moto_selection = true WHERE uuid = ?";
            await query(sql, [driver_uuid]);

            // Actualizar status_driver_selec en la tabla vehicles
            sql = "UPDATE vehicles SET status_driver_selection = true WHERE uuid = ?";
            await query(sql, [vehicle_uuid]);

            // Devolver Driver_Vehicle con información del conductor y del vehículo
            const driverVehicleData = new Driver_Vehicle(uuid, driver_uuid, vehicle_uuid, status);

            return new RegisterDriverVehicle(uuid, driver_uuid, vehicle_uuid, status,driverInfo[0],vehicleInfo[0]);

        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async deleteRegisterDV(uuid: string): Promise<string | Driver_Vehicle | Error | null> {
        try {
            // Obtén la información del registro antes de eliminarlo
            const [recordData]: any = await query('SELECT driver_uuid, vehicle_uuid FROM drivers_vehicles WHERE uuid = ?', [uuid]);

            if (!recordData || recordData.length === 0) {
                return "El registro con el UUID especificado no existe.";
            }
            // Obtén la información del conductor antes de modificar el estado
            const [driverData]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [recordData[0].driver_uuid]);

            
            // Obtén la información del vehículo antes de modificar el estado
            const [vehicleData]: any = await query('SELECT * FROM vehicles WHERE uuid = ?', [recordData[0].vehicle_uuid]);

            
            // Elimina la fila de la tabla drivers_vehicles
            const deleteSql = "DELETE FROM drivers_vehicles WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            const [deleteResult]: any = await query(deleteSql, deleteParams);

            if (driverData && driverData.length > 0) {
                // Actualiza el estado_moto_selection a false en la tabla drivers
                const updateDriverSql = "UPDATE drivers SET status_moto_selection = false WHERE uuid = ?";
                await query(updateDriverSql, [recordData[0].driver_uuid]);
            }

            if (vehicleData && vehicleData.length > 0) {
                // Actualiza el estado_driver_selection a false en la tabla vehicles
                const updateVehicleSql = "UPDATE vehicles SET status_driver_selection = false WHERE uuid = ?";
                await query(updateVehicleSql, [recordData[0].vehicle_uuid]);
            }

            // Verifica si se eliminó alguna fila en la base de datos
            if (deleteResult.affectedRows > 0) {
                return "El registro y sus asociaciones se han actualizado correctamente.";
            } else {
                // Si no se eliminó ninguna fila, el UUID podría no existir en la tabla
                return "El registro con el UUID especificado no existe en la tabla drivers_vehicles.";
            }
        } catch (error) {
            console.error("Error updating record:", error);
            return error as Error;
        }
    }


}