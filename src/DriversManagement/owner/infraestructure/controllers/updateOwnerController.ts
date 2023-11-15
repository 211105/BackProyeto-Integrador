import { Request, Response } from "express";
import { UpdateOwnerUseCase } from "../../application/updateOwnerUseCase";
import { deleteFromS3 } from "../../../../helpers/saveImagesAWS";
import { UploadedFile } from 'express-fileupload';
import { uploadToS3 } from "../../../../helpers/saveImagesAWS";

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

            if (!req.files || !req.files.img_url) {
                img_url = undefined;
                console.log("aaa2")
                console.log(img_url)
            } else {
                const imageFile = req.files.img_url as UploadedFile;
                const s3Key = this.generateS3Key(imageFile.name);
                // Llama a la función para subir a S3 y obtén la URL resultante
                img_url = await uploadToS3(imageFile.data, s3Key, imageFile.mimetype);
                console.log("aaa3")
            }

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