import { Request,Response } from "express";
import { UpdateFolderUseCase } from "../../application/updateFolderUseCase";
import { Folder } from "../../domain/folder";

export class UpdateFolderController{
    constructor(readonly updateFolderUseCase: UpdateFolderUseCase){}

    async update(req: Request, res: Response){

        try {
            let{uuid,title} = req.body;

            const updateFolder = await this.updateFolderUseCase.update(uuid, title);

            if (updateFolder instanceof Folder) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: updateFolder.uuid,
                        user_uuid: updateFolder.user_uuid,
                        title: updateFolder.title,
                        status: updateFolder.status
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