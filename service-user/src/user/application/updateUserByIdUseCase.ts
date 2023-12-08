import { validate } from "class-validator";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorUpdate } from "../domain/validations/user";
import { url } from "inspector";


export class UpdateUserByIdUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        uuid: string,
        name: string,
        email: string,
        phone_number: string,
        ): Promise<User | null | Error> {

        let post = new ValidatorUpdate(uuid,name,email,phone_number)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateUserById = await this.usuarioRepository.updateUserById(uuid,name,email,phone_number);
            return updateUserById;
        } catch (error) {
            throw error; 
        }
    }
}