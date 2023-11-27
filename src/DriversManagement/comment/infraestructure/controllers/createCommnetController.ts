import { Request, Response } from "express";
import { Comment } from "../../domain/comment";
import { CreateCommentUseCase } from "../../application/createCommentUseCase";

export class CreateCommentController {
    constructor(readonly createCommentUseCase: CreateCommentUseCase) {}

    async post(req: Request, res: Response) {
        try {
            let { user_uuid, driver_uuid,rating,commet_text } = req.body;


            const createComment = await this.createCommentUseCase.post(user_uuid, driver_uuid,rating,commet_text,false);

            if (createComment instanceof Comment) {
                return res.status(201).send({
                    status: 'success',
                    data: {
                        uuid:createComment.uuid,
                        user_uuid:createComment.user_uuid,
                        driver_uuid:createComment.driver_uuid,
                        rating:createComment.rating,
                        commet_text:createComment.commet_text,
                        status:createComment.status
                    },
                });

            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Comment.',
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message),
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the comment.",
            });
        }
    }
}
