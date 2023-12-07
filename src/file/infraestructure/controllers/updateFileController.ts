import { File } from "../../domain/file";
import { UpdateFileUseCase } from "../../application/updateFileUseCase";
import { Request, Response } from "express";


export class UpdateFileController {
    constructor(readonly updateFileUseCase: UpdateFileUseCase) { }

    async update(req: Request, res: Response) {
        try {

            let { uuid,title } = req.body;

            const updateFileName = await this.updateFileUseCase.update(uuid, title);

            if (updateFileName) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_file: updateFileName
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "File not found "
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
                message: "An error occurred while update the File."
            });
        }

    }
}
