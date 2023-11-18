import { Folder } from "../domain/folder";
import { FolderRepository } from "../domain/folderRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorFolder } from "../domain/validations/folder";

export class CreateFolderUseCase{
    constructor(readonly folderRepository: FolderRepository){}

    async post(user_uuid:string,title:string,status:boolean):Promise<Folder | null  | string | Error>{
        
        const miuuid: string = uuid();

        let data = new ValidatorFolder(miuuid, user_uuid, title,status);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const createFolder = await this.folderRepository.createFolder(miuuid,user_uuid,title,status);
            return createFolder;
        } catch (error) {
            return null;
        }
    }
}