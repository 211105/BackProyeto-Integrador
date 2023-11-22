import { Driver_Vehicle } from "../domain/driver_vehicle";
import { Driver_VehicleRepository } from "../domain/driver_vehicleRepository";
import { validate } from "class-validator";
import { ValidatorRegister } from "../domain/validations/driver_vehicles";
import { v4 as uuid } from "uuid";

export class RegisterDriver_VehicleUseCase{
    constructor(readonly driver_vehicleRepository:Driver_VehicleRepository){}


    async post(driver_uuid:string,vehicle_uuid:string,status:boolean):Promise<string | { data: Driver_Vehicle, driver?: any, vehicle?: any } | Error | null> {

        const miuuid: string = uuid()

        let data = new ValidatorRegister(miuuid,driver_uuid,vehicle_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const registerDriver_Vehicle = await this.driver_vehicleRepository.registerDriver_Vehicle(miuuid,driver_uuid,vehicle_uuid,status);
            return registerDriver_Vehicle;
        } catch (error) {
            return null;
        }
    }
}