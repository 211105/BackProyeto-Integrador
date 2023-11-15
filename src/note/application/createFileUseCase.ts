import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorFile } from "../domain/validations/note";

export class CreateFileUseCase{
    constructor( readonly noteRepository: NoteRepository){}

    async post(user_uuid:string,title:string,description:string,url_file:string,type_file:string,status:boolean):Promise<Note | null | Error>{
        //valres generados 
        const miuuid: string = uuid();
        let data = new ValidatorFile(miuuid, user_uuid, title, description, url_file, type_file,status);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createFile = await this.noteRepository.createFile(miuuid, user_uuid,title, description,url_file,type_file,status);
            return createFile;
        } catch (error) {
            return null;
        }
    }
}