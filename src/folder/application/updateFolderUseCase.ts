import { Folder } from "../domain/folder";
import { FolderRepository } from "../domain/folderRepository";
import { ValidatorUpdate } from "../domain/validations/folder";
import { validate } from "class-validator";

export class UpdateFolderUseCase{
    constructor(readonly folderRepository:FolderRepository){}

    async update(uuid:string,title:string):Promise<Folder | null | string | Error>{

        let data = new ValidatorUpdate(uuid, title);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updateFolder = await this.folderRepository.updateFolder(uuid, title);
            return updateFolder;
        } catch (error) {
            return null;
        }
    }
}