import { File } from "./file"

export interface FileRepository{
    createFile(
        uuid:string, 
        user_uuid:string,
        folder_uuid:string, 
        title:string,
        url_file:string,
        type_file:string,
        status:boolean
    ):Promise<File | null | Error| string>

    updateFile(uuid:string,title:string):Promise<File | null | Error | string>;

    getFilesByFolder(folder_uuid:string): Promise<File[] | null | Error| string>;
}