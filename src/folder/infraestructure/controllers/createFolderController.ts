import { Request, Response } from "express";
import { CreateFolderUseCase } from "../../application/createFolderUseCase";
import { Folder } from "../../domain/folder";
import { isUserUuidRegistered } from "../validations/foldermysql";

export class CreateFolderController {
    constructor(readonly createFolderUseCase: CreateFolderUseCase) {}

    async post(req: Request, res: Response) {
        try {
            let { user_uuid, title } = req.body;

            const createFolder = await this.createFolderUseCase.post(user_uuid, title, false);

            const isUserUuidExists = await isUserUuidRegistered(user_uuid);

            if (isUserUuidExists) {
                return res.status(400).send({
                    status: "error",
                    message: "El usuario no se encuentra en la base de datos."
                });
            }

            if (createFolder instanceof Folder) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: createFolder.uuid,
                        user_uuid: createFolder.user_uuid,
                        title: createFolder.title,
                        status: createFolder.status
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
