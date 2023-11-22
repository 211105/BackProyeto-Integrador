import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorRegisterVehicle } from "../domain/validations/vehicle";

export class RegisterVehicleUseCase{
    constructor( readonly vehicleRepository: VehicleRepository){}

    async post(
        brand:string,
        model:string,
        plate_number:string,
        name_association:string,
        vin:string,
        url_img:string,
        owner_uuid:string,
        status:boolean,
        status_driver_selection:boolean,
    ):Promise<Vehicle | null | string | Error>{

        const miuuid: string = uuid();

        let data = new ValidatorRegisterVehicle(miuuid, brand,model,plate_number,name_association,vin,url_img,owner_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {

            const registerVehicle = await this.vehicleRepository.registerVehicle(miuuid,brand,model, plate_number,name_association,vin,url_img,owner_uuid,status,status_driver_selection);
            return registerVehicle;

        } catch (error) {
            return null;
        }
    }
}