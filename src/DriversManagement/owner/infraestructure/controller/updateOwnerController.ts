import { Request, Response } from "express";
import { UpdateOwnerUseCase } from "../../application/updateOwnerUseCase";

export class UpdateOwnerController {
    constructor(readonly updateOwnerUseCase: UpdateOwnerUseCase) { }

    async update(req: Request, res: Response) {

        try {
            let { uuid, name, surname, second_surname, email, phone_number } = req.body;

            let updateOwner = await this.updateOwnerUseCase.update(uuid, name, surname, second_surname, email, phone_number);

            if (updateOwner) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_owner: updateOwner,
                        message:"Update correct owner"
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Owner not found "
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