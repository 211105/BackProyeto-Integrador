import { Note } from "../../domain/note";
import { UpdateFileNameUseCase } from "../../application/updateFileNameUseCase";
import { Request, Response } from "express";


export class UpdateFileNameController {
    constructor(readonly updateFileNameUseCase: UpdateFileNameUseCase) { }

    async update(req: Request, res: Response) {
        try {
            let { uuid } = req.params;
            let { title } = req.body;

            const updateFileName = await this.updateFileNameUseCase.update(uuid, title);

            if (updateFileName) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: updateFileName
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
