import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { v4 as uuid } from "uuid";
import { ValidatorNote } from "../domain/validations/note";
import { validate } from "class-validator";

export class CreateNoteUseCase {
    constructor(readonly noteRepository: NoteRepository) { }


    async post(user_uuid: string, title: string, description: string, url_file: string, type_file: string, status: boolean): Promise<Note | null | Error | string> {

        const miuuid: string = uuid();

        let data = new ValidatorNote(miuuid, user_uuid, title, description, url_file, type_file, status);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {

            const createNote = await this.noteRepository.createNote(miuuid, user_uuid, title, description, url_file, type_file, status);
            return createNote;

        } catch (error) {
            return null;
        }
    }
}