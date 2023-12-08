import { Request, Response } from "express";
import { UpdateImgUrlUserUsecase } from "../../application/updateImgUrlUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";




export class UpdateImgUrlController {
    constructor(readonly UpdateImgUrlUserUsecase: UpdateImgUrlUserUsecase) { }
    async run(req: Request, res: Response) {
        try {

            let {
                uuid,
            } = req.body

            const imgFile = req.files?.img_url as UploadedFile;
            const img_urls = await uploadToFirebase(imgFile);

            let UpdateUserById = await this.UpdateImgUrlUserUsecase.run(uuid, img_urls)

            console.log(UpdateUserById)
            if (UpdateUserById) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: UpdateUserById
                    }
                })
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
            console.log('aqui el error que quiero',error)
            return res.status(500).send({
                status: "error",
                message: ("An error occurred while update the user." + error)
            });
        }
    }
}