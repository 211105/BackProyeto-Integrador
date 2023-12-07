import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/note";


export class DeleteFileUseCase{
    constructor(readonly noteRepository: NoteRepository){}

    async delete(uuid:string):Promise<Note | null | Error | string>{

        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const deleteFile = await this.noteRepository.delteFile(uuid);
            return deleteFile;
        } catch (error) {
            return null
        }
    }
}