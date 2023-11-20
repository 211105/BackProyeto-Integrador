import { CreateMarkUseCase } from "../../application/createMarkUseCase";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";

export class CreateMarkController{ 
    constructor(readonly createMarkUseCase: CreateMarkUseCase){}

    async  run(req: Request, res: Response) {
        try {
           
            let {
                latitude,
                longitude,      
                description,
                endDate,
                userUuid,
                activityUuid,
            } = req.body

            if (!req.files || !req.files.img_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }   
            // Castear el archivo a UploadedFile (express-fileupload)

            const imgFile = req.files.img_file as UploadedFile;
            const urlImage = await uploadToFirebase(imgFile)



            let createMark = await this.createMarkUseCase.run(
                latitude,
                longitude,
                description,
                urlImage,
                endDate,
                userUuid,
                activityUuid
            )

            return res.status(201).send({
                status: "ok",
                message: createMark
            });

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}

