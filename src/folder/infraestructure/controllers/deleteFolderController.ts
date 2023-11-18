import { Request,Response } from "express";
import { DeleteFolderUseCase } from "../../application/deleteFolderUseCase";
import { Folder } from "../../domain/folder";

export class DeleteFolderController{
    constructor(readonly deleteFolderUseCase: DeleteFolderUseCase){}

    async delete(req: Request, res: Response){

        try {
            let{uuid} = req.params;

            const deleteFolder = await this.deleteFolderUseCase.delete(uuid);

            if (deleteFolder) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        delete_folder: deleteFolder
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the Folder."
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
                message: "An error occurred while adding the Note Folder."
            });
        }
    }
}