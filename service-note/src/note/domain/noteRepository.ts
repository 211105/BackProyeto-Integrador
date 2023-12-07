import { Note} from "./note";

export interface NoteRepository{


    delteFile(uuid:string):Promise<Note | null | Error | string>
    
    createNote(
        uuid:string, 
        user_uuid:string,
        title:string,
        description:string,
        status:boolean
    ):Promise<Note | null | Error | string>

    updateNote(uuid:string, title?:string, description?:string):Promise<Note | null | Error>;

    getNoteByUser(folder_uuid:string):Promise<Note[] | null | Error>
}