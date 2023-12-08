import { CreateMarkUseCase } from "../../application/createMarkUseCase";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { evaluateImage, uploadToFirebase, verfyImage } from "../../../helpers/saveImages";

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

                
       

            const urlImage = await verfyImage(req.files?.img_file as UploadedFile);
           
            
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
                message: ("An error occurred while adding the Mark. "+error)
            });
        }

    }
}

