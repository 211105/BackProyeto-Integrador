import { Request,Response } from "express";
import { GetCommnetsByDriverUseCase } from "../../application/getCommnetsByDriverUseCase";

export class GetCommnetsByDriverController{
    constructor(readonly getCommnetsByDriverUseCase: GetCommnetsByDriverUseCase){}

    async get(req: Request, res: Response){
        try {
            let{driver_uuid} = req.params;

            const getCommentsByDriver = await this.getCommnetsByDriverUseCase.get(driver_uuid);

            if (getCommentsByDriver) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        drivers: getCommentsByDriver
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Comments not found "
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
                message: "An error occurred while update the Comments."
            });
        }
    }
}