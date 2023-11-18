import { File } from "../domain/file";
import { FileRepository } from "../domain/fileRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/file";

export class GetFilesByFolderUseCase{
    constructor(readonly FileRepository: FileRepository){}

    async get(folder_uuid:string):Promise<File[] | null | Error | string>{

        let data = new ValidatorId(folder_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getFilesByFolder = await this.FileRepository.getFilesByFolder(folder_uuid);
            return getFilesByFolder;
        } catch (error) {
            return null;
        }
    }
}