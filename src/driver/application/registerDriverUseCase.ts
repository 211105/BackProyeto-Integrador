import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { v4 as uuid } from "uuid";
import { encrypt } from "../../helpers/ashs";
import { validate } from "class-validator";
import { ValidatorRegisterDriver } from "../domain/validations/driver";

export class RegisterDriverUseCase {
    constructor(readonly driverRepository: DriverRepository) { }

    async post(
        name: string,
        surname: string,
        second_surname: string,
        email: string,
        password: string,
        url_photography: string,
        identification_number: string,
        url_identification: string,
        phone: string,
        status: boolean,
        status_identity:boolean,
        status_moto_selection:boolean,
        owner_uuid:string,
        type_user:string,
        ): Promise<Driver | null | string | Error> { 
            
        const miuuid: string = uuid()

        let data = new ValidatorRegisterDriver(miuuid, name,surname,second_surname,email,password,url_photography,identification_number,url_identification,phone,owner_uuid,);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        //Se encripta la contraseña
        const hashPassword = await encrypt(password)



        try {
            const registerDriver = await this.driverRepository.registerDriver(
                miuuid,
                name,
                surname,
                second_surname,
                email,
                hashPassword,
                url_photography,
                identification_number,
                url_identification,
                phone,
                status,
                status_identity,
                status_moto_selection,
                owner_uuid,
                type_user
            );

            return registerDriver;
        } catch (error) {
            return null;
        }
    }
}