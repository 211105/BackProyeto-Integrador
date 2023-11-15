import { Note} from "./note";


export interface NoteRepository{

    createFile(
        uuid:string, 
        user_uuid:string, 
        title:string,
        description:string,
        url_file:string,
        type_file:string,
        status:boolean):Promise<Note | null | Error>
}