import { Note} from "./note";


export interface NoteRepository{

    createFile(
        uuid:string, 
        user_uuid:string, 
        title:string,
        description:string,
        url_file:string,
        type_file:string,
        status:boolean
    ):Promise<Note | null | Error>

    updateFileName(uuid:string, title:string):Promise<Note | null | Error>;

    getFilesbyUser(user_uuid:string):Promise<Note[] | null | Error>

    delteFile(uuid:string):Promise<Note | null | Error | string>
}