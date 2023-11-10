import { Request,Response } from "express";
import { RegisterDriverUseCase } from "../../application/registerDriverUseCase";
import { Driver} from "../../domain/driver";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";

export class RegisterDriverController{
    constructor( readonly registerDriverUseCase: RegisterDriverUseCase){}


    async post(req: Request, res: Response){
        try {
            let{
                name,
                surname,
                second_surname,
                email,
                password,
                identification_number,
                phone
            } = req.body;
            if (!req.files || !req.files.photo_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }
            if (!req.files || !req.files.identification_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }
            // Castear el archivo a UploadedFile (express-fileupload)
            const photoFile = req.files.photo_file as UploadedFile;
            const url_photography = await uploadToFirebase(photoFile)
            console.log(url_photography)
    
            const imgFile = req.files.photo_file as UploadedFile;
            const url_identification = await uploadToFirebase(imgFile)
            console.log(url_identification)
    
            let registerDriver = await this.registerDriverUseCase.post(
                name,
                surname,
                second_surname,
                email,
                password,
                url_photography,
                identification_number,
                url_identification,
                phone,
                true
            )
            if(registerDriver instanceof Driver){
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id:registerDriver.uuid,
                        name:registerDriver.name,
                        surname:registerDriver.surname,
                        second_surname:registerDriver.second_surname,
                        email:registerDriver.email,
                        password:registerDriver.password,
                        identification_number:registerDriver.identification_number,
                        phone:registerDriver.phone,
                        status:registerDriver.status
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the Driver."
                });
            }
        } catch (error) {
            return error;
        }
        
    }
}