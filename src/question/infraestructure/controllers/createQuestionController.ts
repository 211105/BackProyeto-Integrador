import { Request, Response } from "express";
import { CreateQuestionUseCase } from "../../application/createQuestionUseCase";
import { Question } from "../../domain/question";

export class CreateQuestionController {
    constructor(readonly createQuestionUseCase: CreateQuestionUseCase) { }

    async post(req: Request, res: Response) {
        try {

            let { content } = req.body;
            const createQuestion = await this.createQuestionUseCase.post(content);

            if (createQuestion instanceof Question) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: createQuestion.uuid,
                        content: createQuestion.content,                       
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the question."
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the question."
            });

        }

    }
}