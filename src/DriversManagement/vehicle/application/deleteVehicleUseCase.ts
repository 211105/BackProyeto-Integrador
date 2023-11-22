import { Vehicle } from "../domain/vehicle";
import {VehicleRepository } from "../domain/vehicleRepository"
import { ValidatorId } from "../domain/validations/vehicle";
import { validate } from "class-validator";

export class DeleteVehicleUseCase{
    constructor(readonly vehicleRepository:VehicleRepository){}

    async delete(uuid:string):Promise<Vehicle | null | string | Error>{

        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteFolder = await this.vehicleRepository.deleteVehicle(uuid);
            return deleteFolder;
        } catch (error) {
            return null;
        }
    }
}