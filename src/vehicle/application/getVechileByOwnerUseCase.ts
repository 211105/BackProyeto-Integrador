import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/vehicle";



export class GetVehicleByOwnerUseCase{
    constructor(readonly vehicleRepository: VehicleRepository){}

    async get(owner_uuid:string):Promise<Vehicle[] | null | Error | string>{

        let data = new ValidatorId(owner_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getNoteByUser = await this.vehicleRepository.getVehicleByOwner(owner_uuid);
            return getNoteByUser;
        } catch (error) {
            return null;
        }
    }
}