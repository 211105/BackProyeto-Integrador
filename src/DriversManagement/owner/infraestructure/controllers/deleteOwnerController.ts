import { Request,Response } from "express";
import { DeleteOwnerUseCase } from "../../application/deleteOwnerUseCase";

export class DeleteOwnerControlller{
    constructor(readonly deleteOwnerUseCase: DeleteOwnerUseCase){}

    async delete(req: Request, res: Response){
        try {
            let {uuid} = req.params;

            const deleteOwner = await this.deleteOwnerUseCase.delete(uuid);

            if (deleteOwner) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        message: deleteOwner,
                        
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Owner not found "
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