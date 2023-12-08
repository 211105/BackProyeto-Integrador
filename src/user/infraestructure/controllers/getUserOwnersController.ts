import { Request,Response } from "express";
import { GetUserOwnersUseCase } from "../../application/getUserOwnersUseCase";

export class GetUserOwnersControllers{

    constructor(readonly getUserOwnersUseCase:GetUserOwnersUseCase){}

    async get(req: Request, res: Response){
        try {
            let {uuids} = req.body;
            const getUser = await this.getUserOwnersUseCase.get(uuids);

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
                    message: "An unexpected error occurred while userowner"
                });
            }


        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the user."
            });
        }
    }
}