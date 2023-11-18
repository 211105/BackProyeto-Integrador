import { Folder } from "../domain/folder";
import { FolderRepository } from "../domain/folderRepository";
import { ValidatorId } from "../domain/validations/folder";
import { validate } from "class-validator";

export class DeleteFolderUseCase{
    constructor(readonly folderRepository:FolderRepository){}

    async delete(uuid:string):Promise<Folder | null | string | Error>{

        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteFolder = await this.folderRepository.deleteFolder(uuid);
            return deleteFolder;
        } catch (error) {
            return null;
        }
    }
}