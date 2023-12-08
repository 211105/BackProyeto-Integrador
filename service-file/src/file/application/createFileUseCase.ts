import { File } from "../domain/file";
import { FileRepository } from "../domain/fileRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorFile } from "../domain/validations/file";

export class CreateFileUseCase{
    constructor( readonly fileRepository: FileRepository){}

    async post(user_uuid:string,notes_uuid:string,title:string,url_file:string,type_file:string,status:boolean):Promise<File | null | Error | string>{
        //valres generados 
        const miuuid: string = uuid();

        let data = new ValidatorFile(miuuid, user_uuid,notes_uuid, title, url_file,status);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createFile = await this.fileRepository.createFile(miuuid, user_uuid,notes_uuid,title,url_file,type_file,status);
            return createFile;
        } catch (error) {
            return null;
        }
    }
}