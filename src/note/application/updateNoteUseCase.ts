import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domain/validations/note";


export class UpdateNoteUseCase{
    constructor( readonly noteRepository: NoteRepository){}

    async update(uuid:string, title?:string, description?:string):Promise<Note | null | Error>{

        let data = new ValidatorUpdate(uuid,title,description);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updateNote = await this.noteRepository.updateNote(uuid, title, description);
            return updateNote;
        } catch (error) {
            return null;
        }
    }
}