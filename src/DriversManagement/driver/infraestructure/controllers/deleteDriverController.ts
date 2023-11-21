import { Request,Response } from "express";
import { DeleteDriverUseCase } from "../../application/deleteDriverUseCase";

export class DeleteDriverController{
    constructor(readonly deleteDriverUseCase: DeleteDriverUseCase){}

    async delete(req: Request, res: Response){

        try {
            let{uuid} = req.params;

            const deleteDriver = await this.deleteDriverUseCase.delete(uuid);

            if (deleteDriver) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        delete_driver: deleteDriver
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the Driver."
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
                message: "An error occurred while adding the Note Driver."
            });
        }
    }
}