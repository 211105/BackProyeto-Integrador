import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";
import { UpdateActivityUseCase } from "../../application/updateActivityUseCase";




export class UpdateActivityByIdController {
    constructor(readonly updateActivityUseCase: UpdateActivityUseCase) { }
    async run(req: Request, res: Response) {
        try {

            let {
                uuid,
                name,
            } = req.body

            let img_url: undefined | string;
            if (!req.files || !req.files.img_file) {
                img_url = undefined;
            } else {
                const imgFile = req.files.img_file as UploadedFile;
                img_url = await uploadToFirebase(imgFile);
            }

            if (name === undefined && img_url === undefined) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: "no hay cambios"
                    }
                })
            }

            let UpdateUserById = await this.updateActivityUseCase.run(uuid,name,img_url)

            if (UpdateUserById) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: UpdateUserById
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