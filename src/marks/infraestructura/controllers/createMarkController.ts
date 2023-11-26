import { CreateMarkUseCase } from "../../application/createMarkUseCase";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";

export class CreateMarkController{ 
    constructor(readonly createMarkUseCase: CreateMarkUseCase){}

    async  run(req: Request, res: Response) {
        try {
        console.log("se ejecuta primero use case")
           
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

            console.log(req.files.img_file)
            const imgFile = req.files.img_file as UploadedFile;
            console.log(imgFile)
            const urlImage = await uploadToFirebase(imgFile)
            console.log("aqui ando pa")
            console.log(urlImage)
            if (urlImage == null) {
                return res.status(400).send({
                    status: "error",
                    message: "La imagen no cumple con las políticas de privacidad y no está permitida."
                });
            }


            let createMark = await this.createMarkUseCase.run(
                latitude,
                longitude,
                description,
                urlImage,
                endDate,
                userUuid,
                activityUuid
            )
            console.log(typeof(createMark))
            return res.status(201).send({
                status: "ok",
                message: createMark
            });

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {      
                    const errors = JSON.parse(error.message);
                    const modifiedErrors = errors.map(({ property, children, constraints }) => ({
                        property,
                        children,
                        constraints
                    }));
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: modifiedErrors
                    });
                }
            }
            
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }

    }
}

