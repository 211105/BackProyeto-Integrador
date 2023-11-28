import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { validate } from "class-validator";
import { ValidatorUpdateDriver } from "../domain/validations/driver";


export class UpdateDriverUseCase{
    constructor(readonly driverRepository: DriverRepository){}

    async update(uuid:string, email?:string, url_photography?:string, phone?:string ):Promise<Driver | null | Error | string>{

        let data = new ValidatorUpdateDriver(uuid,email,url_photography,phone);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateDriver = await this.driverRepository.updateDriver(uuid, email, url_photography, phone);
            return updateDriver;

        } catch (error) {
            return `${error}`
        }
    }
}