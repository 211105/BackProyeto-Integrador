import { UploadedFile } from "express-fileupload";
import { AddActivityUseCase } from "../../application/addActivityUseCase";
import { Request, Response } from "express";    
import { uploadToFirebase, verfyImage } from "../../../helpers/saveImages";
export class AddActivityController {
    constructor(readonly addActivityUseCase: AddActivityUseCase) {}
    async run(req: Request, res:Response){
        try {
            let {
                name
            } = req.body

            const urlImage = await verfyImage(req.files?.img_file as UploadedFile);
            
            let addActivity = await this.addActivityUseCase.run(name, urlImage || "")
            
            return res.status(201).send({
                status: "succes",
                data: {
                    addActivity
                }
            })

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
                message: ("An error occurred while adding the Activity. "+error)
            });
        }
    }
}