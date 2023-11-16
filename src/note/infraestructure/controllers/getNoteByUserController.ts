import { Request,Response } from "express";
import { GetNotesByUserUseCase } from "../../application/getNoteByUserUseCase";

export class GetNoteByUserController{
    constructor(readonly getNotesByUserUseCase: GetNotesByUserUseCase){}

    async get(req: Request, res: Response){
        try {
            let{user_uuid} = req.params;

            const getNotesByUser = await this.getNotesByUserUseCase.get(user_uuid);

            if (getNotesByUser) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        file: getNotesByUser
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found "
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
                message: "An error occurred while update the user."
            });
        }
    }
}