import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { ValidatorId } from "../domain/validations/driver";
import { validate } from "class-validator";

export class DeleteDriverUseCase{
    constructor(readonly driverRepository:DriverRepository){}

    async delete(uuid:string):Promise<Driver | null | string | Error>{

        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteFolder = await this.driverRepository.deleteDriver(uuid);
            return deleteFolder;
        } catch (error) {
            return null;
        }
    }
}