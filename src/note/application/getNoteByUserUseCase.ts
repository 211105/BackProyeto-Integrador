import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/note";

export class GetNotesByUserUseCase{
    constructor(readonly noteRepository: NoteRepository){}

    async get(user_uuid:string):Promise<Note[] | null | Error>{

        let data = new ValidatorId(user_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getNoteByUser = await this.noteRepository.getNoteByUser(user_uuid);
            return getNoteByUser;
        } catch (error) {
            return null;
        }
    }
}