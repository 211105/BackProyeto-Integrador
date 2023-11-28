import { CreateMarkUseCase } from "../../application/createMarkUseCase";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { evaluateImage, uploadToFirebase } from "../../../helpers/saveImages";

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

            const imgFile = req.files.img_file as UploadedFile;

            try {
                console.log("holisss")
                await evaluateImage(imgFile.data);
            } catch (error) {
                console.log(error)
                // Si la imagen es inapropiada, se devuelve un error HTTP 400
                return res.status(400).send({
                    status: "error",
                    message: "La imagen no cumple con las políticas de contenido y se considera inapropiada."
                });
            }

            const urlImage = await uploadToFirebase(imgFile)
            if (urlImage === null) {
                return res.status(400).send({
                    status: "error",
                    message: "Failed to upload image."
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

