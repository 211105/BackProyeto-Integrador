import { Driver_Vehicle,RegisterDriverVehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository, } from "../domain/driver_vehicleRepository";
import { validate } from "class-validator";
import { ValidatorRegister } from "../domain/validations/driver_vehicles";

export class DeleteRegisterDVUseCase{
    constructor(readonly driver_vehicleRepository:Driver_VehicleRepository){}

    async delete(uuid:string):Promise<RegisterDriverVehicle | null | string | Error> {
        console.log("aaaaaa")
        try {
            const deleteRegisterDV = await this.driver_vehicleRepository.deleteRegisterDV(uuid);
            return deleteRegisterDV;
        } catch (error) {
            return null;
        }
    }
}