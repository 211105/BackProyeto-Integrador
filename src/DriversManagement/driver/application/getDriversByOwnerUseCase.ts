import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/driver";



export class GetDriverByOwnerUseCase{
    constructor(readonly driverRepository: DriverRepository){}

    async get(owner_uuid:string):Promise<Driver[] | null | Error | string>{

        let data = new ValidatorId(owner_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getNoteByUser = await this.driverRepository.getDriversByOwner(owner_uuid);
            return getNoteByUser;
        } catch (error) {
            return null;
        }
    }
}