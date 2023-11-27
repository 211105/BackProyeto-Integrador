import { Comment } from "../domain/comment";
import { CommentRepository } from "../domain/commentRepository";
import { validate } from "class-validator";
import { ValidatorId } from "../domain/validations/comment";



export class GetCommnetsByDriverUseCase{
    constructor(readonly commentRepository: CommentRepository){}

    async get(driver_uuid:string):Promise<Comment[] | null | Error | string>{

        let data = new ValidatorId(driver_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getCommentsByDriver = await this.commentRepository.getCommentsByDriver(driver_uuid);
            return getCommentsByDriver;
        } catch (error) {
            return null;
        }
    }
}