import { validate } from "class-validator";
import { User } from "../domain/user";
import { v4 as uuid } from "uuid";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorRegisterUser } from "../domain/validations/user";
import { encrypt } from "../../helpers/ashs";



export class RegisterUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) { }

    async run(
        name: string,
        email: string,
        phone_number: string,
        img_url: string,
        password: string,
        type_user:string,
    ): Promise<User | null | string | Error>{

        //valres generados 
        const miuuid: string = uuid()
       

        //validator-class
        let data = new ValidatorRegisterUser(miuuid, name, email, phone_number, img_url, password);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        //aqui por que si va vacio se hashea antes evitando asi la validacion
        const hashPassword = await encrypt(password)
        try {
            const createUser = await this.usuarioRepository.registerUser(
                miuuid,
                name,
                email,
                phone_number,
                img_url,
                hashPassword,
                type_user
            );

            return createUser;
        } catch (error) {
            throw error;
        }
    }
}