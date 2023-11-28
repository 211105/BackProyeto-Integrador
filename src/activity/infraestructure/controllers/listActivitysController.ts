import { Request, Response } from "express";

import { ListActivitysUseCase } from "../../application/listActyvitiysUseCase";




export class ListActivitysController {
    constructor(readonly listActivitysUseCase: ListActivitysUseCase) { }
    async run(req: Request, res: Response) {
        try {
            let listActivitys = await this.listActivitysUseCase.run()

          
                return res.status(200).send({
                    status: "succes",
                        message: listActivitys
                })
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