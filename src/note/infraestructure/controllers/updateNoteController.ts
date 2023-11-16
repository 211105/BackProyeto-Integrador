import { Request, Response } from "express";
import { UpdateNoteUseCase } from "../../application/updateNoteUseCase";

export class UpdateNoteController {
    constructor(readonly updateNoteUseCase: UpdateNoteUseCase) { }

    async update(req: Request, res: Response) {
        try {
            let{uuid} = req.params;
            let { title, description } = req.body;

            if (title === undefined && description === undefined) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: "no hay cambios"
                    }
                })
            }

            const updateNote = await this.updateNoteUseCase.update(uuid, title, description);
            if (updateNote) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        Note_update: updateNote
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
                message: "An error occurred while update the Note."
            });
        }



    }
}