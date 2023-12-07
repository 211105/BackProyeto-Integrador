import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";

export class GetUserByUuidUseCase{
    constructor(readonly IUsuarioRepository:IUsuarioRepository){}

    async get(uuid:string): Promise<User | null>{
        try {
            const getUser = await this.IUsuarioRepository.getUserByUuid(uuid);
            return getUser;
        } catch (error) {
            return null;
        }
    }
}