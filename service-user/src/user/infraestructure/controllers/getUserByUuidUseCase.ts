import { GetUserByUuidUseCase } from "../../application/getUserByUuidUseCase";
import { Request,Response } from "express";


export class GetUserByUuidController{

    constructor(readonly getUserByUuidUseCase:GetUserByUuidUseCase){}

    async get(req: Request, res: Response){
        try {
            let {uuid} = req.params;

            const getUser = await this.getUserByUuidUseCase.get(uuid);

            if (getUser) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        getUser
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the user."
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