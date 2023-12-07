import { File } from "../domain/file";
import { FileRepository } from "../domain/fileRepository";
import { ValidatorId } from "../domain/validations/file";
import { validate } from "class-validator";

export class DeleteFileUseCase{
    constructor(readonly fileRepository:FileRepository){}

    async delete(uuid:string):Promise<File | null | string | Error>{

        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteFolder = await this.fileRepository.deleteFile(uuid);
            return deleteFolder;
        } catch (error) {
            return null;
        }
    }
}