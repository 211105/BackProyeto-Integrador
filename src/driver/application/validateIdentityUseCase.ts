import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { validate } from "class-validator";
import { ValidatorIdetity } from "../domain/validations/driver";


export class ValidateIdentityUseCase{
    constructor(readonly driverRepository: DriverRepository){}


    async update (uuid: string,url_identification:string):Promise<Driver | null | string | Error>{

        let data = new ValidatorIdetity(uuid,url_identification);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const validateIdentity = await this.driverRepository.validateIdentity(uuid,url_identification);
            return validateIdentity;
        } catch (error) {
            return `${error}`
        }
    }
}