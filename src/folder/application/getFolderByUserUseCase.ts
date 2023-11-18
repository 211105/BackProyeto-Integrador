import { Folder } from "../domain/folder";
import { FolderRepository } from "../domain/folderRepository";
import { ValidatorId } from "../domain/validations/folder";
import { validate } from "class-validator";

export class GetFolderByUserUseCase{
    constructor(readonly folderRepository:FolderRepository){}

    async get(user_uuid:string):Promise<Folder[] | null | string | Error>{

        let data = new ValidatorId(user_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const getFolderUser = await this.folderRepository.getFolderByUser(user_uuid);
            return getFolderUser;
        } catch (error) {
            return null;
        }
    }
}