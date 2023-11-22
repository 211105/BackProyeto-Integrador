import { Request, Response } from "express";    
import { DeleteActivityUseCase } from "../../application/deleteActivityUseCase";

export class DeleteActivityController {
    constructor(readonly deleteActivityUseCase : DeleteActivityUseCase) {}
    async run(req: Request, res:Response){
        try {
            let {
                uuid
            } = req.body
            console.log(uuid)
            let addActivity = await this.deleteActivityUseCase.run(uuid)
            
            return res.status(201).send({
                status: "succes",
                data: {
                    addActivity
                }
            })

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}