import { File } from "./file"

export interface FileRepository{
    createFile(
        uuid:string, 
        user_uuid:string,
        notes_uuid:string, 
        title:string,
        url_file:string,
        type_file:string,
        status:boolean
    ):Promise<File | null | Error| string>

    updateFile(uuid:string,title:string):Promise<File | null | Error | string>;

    getFilesByFolder(notes_uuid:string): Promise<File[] | null | Error| string>;

    deleteFile(uuid:string): Promise<File | null  | Error | string>
}