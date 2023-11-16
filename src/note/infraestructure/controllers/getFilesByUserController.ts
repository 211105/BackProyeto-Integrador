import { Request,Response } from "express";
import { GetFilesByUserUseCase } from "../../application/getFilesByUserUseCase";

export class GetFilesByUserController{
    constructor(readonly getFilesByUserUseCase: GetFilesByUserUseCase){}

    async get(req: Request, res: Response){
        try {
            let{user_uuid} = req.params;

            const getFilesByUser = await this.getFilesByUserUseCase.get(user_uuid);

            if (getFilesByUser) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        file: getFilesByUser
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