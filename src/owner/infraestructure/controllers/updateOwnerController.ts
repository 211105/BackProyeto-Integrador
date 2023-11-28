import { Request, Response } from "express";
import { UpdateOwnerUseCase } from "../../application/updateOwnerUseCase";
import { UploadedFile } from 'express-fileupload';

export class UpdateOwnerController {
    constructor(readonly updateOwnerUseCase: UpdateOwnerUseCase) { }

    private generateS3Key(filename: string): string {
        const timestamp = new Date().toISOString().replace(/[-:]/g, '');
        return `images/${timestamp}_${filename}`;
    }

    async update(req: Request, res: Response) {

        try {
            let { uuid, name, surname, second_surname, email, phone_number } = req.body;

            console.log("aaa1")

            let img_url: undefined | string;
            console.log(img_url)


            if (name === undefined && email === undefined && surname === undefined && second_surname === undefined && phone_number === undefined && img_url === undefined) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        update_user: "no hay cambios"
                    }
                });
            }



            let updateOwner = await this.updateOwnerUseCase.update(uuid, name, surname, second_surname, email, phone_number, img_url);

            if (updateOwner) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_owner: updateOwner,
                        message: "Update correct owner"
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