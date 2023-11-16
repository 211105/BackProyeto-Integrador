import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";


export class UpdateFileNameUseCase{
    constructor(readonly noteRepository: NoteRepository) {}

    async update(uuid: string,title:string): Promise<Note | null | Error>{
        try {
            const updateFileName = await this.noteRepository.updateFileName(uuid, title);
            return updateFileName;
        } catch (error) {
            return null;
        }
    }
}