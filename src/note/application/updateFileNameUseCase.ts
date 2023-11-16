import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { validate } from "class-validator";
import { ValidatorUpdateName } from "../domain/validations/note";


export class UpdateFileNameUseCase{
    constructor(readonly noteRepository: NoteRepository) {}

    async update(uuid: string,title:string): Promise<Note | null | Error>{

        let data = new ValidatorUpdateName(uuid,title);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updateFileName = await this.noteRepository.updateFileName(uuid, title);
            return updateFileName;
        } catch (error) {
            return null;
        }
    }
}