import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";

export class GetUserOwnersUseCase{
    constructor(readonly IUsuarioRepository:IUsuarioRepository){}

    async get(uuidUserOwners: string[]): Promise<User | null>{
        try {
            const getUser = await this.IUsuarioRepository.getUserOwners(uuidUserOwners);
            return getUser;
        } catch (error) {
            return null;
        }
    }
}