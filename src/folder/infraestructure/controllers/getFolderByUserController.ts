import { Request,Response } from "express";
import { GetFolderByUserUseCase } from "../../application/getFolderByUserUseCase";
import { Folder } from "../../domain/folder";

export class GetFolderByUserController{
    constructor(readonly getFolderByUserUseCase: GetFolderByUserUseCase){}

    async get(req: Request, res: Response){

        try {
            let{user_uuid} = req.params;

            const getFoldersUser = await this.getFolderByUserUseCase.get(user_uuid);

            if (getFoldersUser) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        folders: getFoldersUser
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while the Folder."
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
                message: "An error occurred while adding the Folder."
            });
        }
    }
}