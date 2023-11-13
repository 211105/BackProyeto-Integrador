import { query } from "../../../database/connection";
import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";


export class MysqlVehicleRepository implements VehicleRepository{

    async registerVehicle(uuid: string, brand: string, model: string, plate_number: string, name_association: string, vin: string, url_img_vehicle: string, uuid_driver: string, status: boolean): Promise<string | Vehicle | null | Error> {
        try {
            let sql = "INSERT INTO vehicles (uuid,brand,model,plate_number,name_association,vin,url_img_vehicle,uuid_driver,status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid,brand,model,plate_number,name_association,vin,url_img_vehicle,uuid_driver,status];
            const [result]: any = await query(sql, params);
            return new Vehicle(uuid,brand,model,plate_number,name_association,vin,url_img_vehicle,uuid_driver,status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }  
    }
}


