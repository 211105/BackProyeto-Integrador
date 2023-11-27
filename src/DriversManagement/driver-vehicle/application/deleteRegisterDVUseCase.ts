import { Driver_Vehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository } from "../domain/driver_vehicleRepository";
import { validate } from "class-validator";
import { ValidatorRegister } from "../domain/validations/driver_vehicles";

export class DeleteRegisterDVUseCase{
    constructor(readonly driver_vehicleRepository:Driver_VehicleRepository){}


    async delete(uuid:string):Promise<Driver_Vehicle | null | string | Error> {

        try {
            const deleteRegisterDV = await this.driver_vehicleRepository.deleteRegisterDV(uuid);
            return deleteRegisterDV;
        } catch (error) {
            return null;
        }
    }
}