import { Folder } from "./folder";

export interface FolderRepository{

    createFolder(uuid:string, user_uuid:string,title:string,status:boolean):Promise<Folder | null | string | Error>
    
    updateFolder(uuid:string, title:string):Promise<Folder | null | string | Error>

    deleteFolder(uuid:string):Promise<Folder | null | string | Error>

    getFolderByUser(user_uuid:string):Promise<Folder[] | null | string | Error>

}