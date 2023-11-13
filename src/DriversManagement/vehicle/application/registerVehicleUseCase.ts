import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";
import { v4 as uuid } from "uuid";

export class RegisterVehicleUseCase{
    constructor( readonly vehicleRepository: VehicleRepository){}

    async post(
        brand:string,
        model:string,
        plate_number:string,
        name_association:string,
        vin:string,
        url_img_vehicle:string,
        uuid_driver:string,
        status:boolean,
    ):Promise<Vehicle | null | string | Error>{

        const miuuid: string = uuid();
        
        try {

            const registerVehicle = await this.vehicleRepository.registerVehicle(miuuid,brand,model, plate_number,name_association,vin,url_img_vehicle,uuid_driver,status);
            return registerVehicle;

        } catch (error) {
            return null;
        }
    }
}