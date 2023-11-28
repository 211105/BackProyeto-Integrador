import { Comment } from "./comment";

export interface CommentRepository{
    
    createComment(uuid:string, user_uuid:string, driver_uuid:string, rating:number, commet_text:string,status:boolean):Promise<Comment | null | Error | string>

    getCommentsByDriver(driver_uuid:string):Promise<Comment[] | null | Error | string>

    getRatingDriver(driver_uuid:string):Promise<Comment | null | Error | string| number>
    
}