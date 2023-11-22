import { query } from "../../../database/connection";
import { Driver_Vehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository } from "../domain/driver_vehicleRepository";

export class MysqlDriver_VehicleRepository implements Driver_VehicleRepository {

    async registerDriver_Vehicle(uuid: string, driver_uuid: string, vehicle_uuid: string, status: boolean): Promise<{ data: Driver_Vehicle; driver?: any; vehicle?: any; } | Error> {
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
    
            if (driverInfo && vehicleInfo) {
                // Si tienes información del conductor y del vehículo, agrégala al objeto de retorno
                return {
                    data: driverVehicleData,
                    driver: driverInfo[0],
                    vehicle: vehicleInfo[0],
                };
            } else {
                // Si no tienes información del conductor o del vehículo, retorna solo el objeto Driver_Vehicle
                return {
                    data: driverVehicleData,
                };
            }
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    
}