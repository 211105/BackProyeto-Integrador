import { Owner } from "../domain/owner";
import { OwnerRepository} from "../domain/ownerRepostitory";
import { v4 as uuid } from "uuid";
import { encrypt } from "../../helpers/ashs";
import { ValidatorRegisterOwner } from "../domain/validations/owner";
import { validate } from "class-validator";

export class RegisterOwnerUseCase{
    constructor( readonly ownerRepository: OwnerRepository){}

    async post( 
        name:string,
        surname:string,
        second_surname:string,
        email:string,
        password:string,
        phone_number:string,
        img_url:string,
        type_user:string,
        status:boolean
        ): Promise<Owner | null | Error | string>{
        
        const miuuid: string = uuid()

        let data = new ValidatorRegisterOwner(miuuid, name,surname,second_surname,email,password,phone_number,img_url);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        //Se encripta la contraseña
        const hashPassword = await encrypt(password)
        try {
            const registerOwner = await this.ownerRepository.registerOwner(
                miuuid, 
                name, 
                surname, 
                second_surname, 
                email,
                hashPassword,
                phone_number, 
                img_url, 
                type_user, 
                status);
            return registerOwner;
        } catch (error) {
            return null;
        }
    }
}