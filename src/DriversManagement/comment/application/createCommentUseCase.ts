import { Comment } from "../domain/comment";
import { CommentRepository } from "../domain/commentRepository";
import { validate } from "class-validator";
import { v4 as uuid } from "uuid";
import { ValidatorCreate } from "../domain/validations/comment";


export class CreateCommentUseCase{
    constructor(readonly commentRepository:CommentRepository){}


    async post(user_uuid:string, driver_uuid:string,rating:number, commet_text:string,status:boolean):Promise<Comment | null | string | Error> {

        const miuuid: string = uuid()

        let data = new ValidatorCreate(miuuid,user_uuid,driver_uuid,rating,commet_text,status);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createCommnet = await this.commentRepository.createComment(miuuid,user_uuid,driver_uuid,rating,commet_text,status);
            return createCommnet;
        } catch (error) {
            return null;
        }
    }
}