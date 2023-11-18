import { Request,Response } from "express";
import { DeleteFileUseCase } from "../../application/deleteFileUseCase";

export class DeleteFileController{
    constructor(readonly deleteFileUseCase: DeleteFileUseCase){}

    async delete(req: Request, res: Response){

        try {
            let{uuid} = req.params;

            const deleteFolder = await this.deleteFileUseCase.delete(uuid);

            if (deleteFolder) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        delete_File: deleteFolder
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the File."
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
                message: "An error occurred while adding the Note File."
            });
        }
    }
}