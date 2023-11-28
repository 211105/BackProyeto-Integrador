import { Driver, ResonseLogin } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { validate } from "class-validator";
import { ValidateLogin } from "../domain/validations/driver";

export class LoginDriverUseCase {
    constructor(readonly driverRepository: DriverRepository) { }


    async login(email: string, password: string): Promise<ResonseLogin | null | string> {

        //validator-class
        let post = new ValidateLogin(email, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const loginDriver = await this.driverRepository.loginDriver(email, password);
            return loginDriver
        } catch (error) {
            return null;
        }
    }
}