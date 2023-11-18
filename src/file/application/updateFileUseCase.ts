import { File } from "../domain/file";
import { FileRepository } from "../domain/fileRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domain/validations/file";




export class UpdateFileUseCase{
    constructor(readonly fileRepository: FileRepository) {}

    async update(uuid: string,title:string): Promise<File | null | Error | string>{

        let data = new ValidatorUpdate(uuid,title);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updateFileName = await this.fileRepository.updateFile(uuid, title);
            return updateFileName;
        } catch (error) {
            return null;
        }
    }
}