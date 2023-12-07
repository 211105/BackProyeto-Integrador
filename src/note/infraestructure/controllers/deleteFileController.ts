import { Request,Response } from "express";
import { DeleteFileUseCase } from "../../application/deleteFileUseCase";

export class DeleteFileController{
    constructor(readonly deleteFileUseCase: DeleteFileUseCase){}

    async delete(req: Request, res:Response){
        try {
            let{uuid} = req.params;

            const deleteFile = await this.deleteFileUseCase.delete(uuid);

            if (deleteFile) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        delete_file: deleteFile
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