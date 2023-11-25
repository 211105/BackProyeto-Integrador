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
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {      
                    const errors = JSON.parse(error.message);
                    const modifiedErrors = errors.map(({ property, children, constraints }) => ({
                        property,
                        children,
                        constraints
                    }));
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: modifiedErrors
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}