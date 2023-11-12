import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { validate } from "class-validator";
import { ValidatorupdatePassword } from "../domain/validations/driver";


export class UpdatePasswordUseCase{
    constructor(readonly driverRepository: DriverRepository){}

    async update(uuid:string, password:string):Promise<Driver | null>{

        let data = new ValidatorupdatePassword(uuid,password);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updateDriver = await this.driverRepository.updatePassword(uuid, password);
            return updateDriver;
        } catch (error) {
            return null;
        }
    }
}