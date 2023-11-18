import { Request,Response } from "express";
import { GetFilesByFolderUseCase } from "../../application/getFilesByFolderUseCase";

export class GetFilesByFolderController{
    constructor(readonly getFilesByFolderUseCase: GetFilesByFolderUseCase){}

    async get(req: Request, res: Response){
        try {
            let{folder_uuid} = req.params;

            const getFilesByFolder = await this.getFilesByFolderUseCase.get(folder_uuid);

            if (getFilesByFolder) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        file: getFilesByFolder
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Files not found "
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
                message: "An error occurred while update the Files."
            });
        }
    }
}