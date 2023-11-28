import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";
import { validate } from "class-validator";
import { ValidatorUpdateVehicle } from "../domain/validations/vehicle";


export class UpdateVehicleByUuidUseCase{
    constructor(readonly vehicleRepository: VehicleRepository){}

    async update(uuid:string, brand?:string, model?:string, plate_number?:string,name_association?:string, vin?:string,url_img?:string ):Promise<Vehicle | null | Error | string>{

        let data = new ValidatorUpdateVehicle(uuid, brand, model, plate_number, name_association,vin,url_img);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateVehicle = await this.vehicleRepository.updateVehicleByUuid(uuid, brand, model, plate_number, name_association,vin,url_img)
            return updateVehicle;

        } catch (error) {
            return `${error}`
        }
    }
}