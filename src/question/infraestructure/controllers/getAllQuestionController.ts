import { Request, Response } from "express";
import { GetAllQuestionUseCase } from "../../application/getAllQuestionUseCase";


export class GetAllQuestionController {
    constructor(readonly getAllQuestionUseCase: GetAllQuestionUseCase) { }


    async get(req: Request, res: Response) {
        try {
            const getAllQuestions = await this.getAllQuestionUseCase.get();

            if (getAllQuestions) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        getAllQuestions
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