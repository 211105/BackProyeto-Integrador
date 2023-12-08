import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/registerUseCase";
import { User } from "../../domain/user";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";


export class ResgisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) { }
    async run(req: Request, res: Response) {
        

        try {

            let {
                name,
                email,
                phone_number,
                password,
            } = req.body

            const imgFile = req.files?.img_file as UploadedFile | null;
            const img_url = await uploadToFirebase(imgFile);

            let registerUser = await this.registerUserUseCase.run(
                name,
                email,
                phone_number,
                img_url,
                password,
                'user'
            )
         

            if (registerUser instanceof User) {
                return res.status(201).send({
                    status: "succes",
                    registerUser
                })
            }

        } catch (error) {
            console.log("entre al error", error)
            // Manejo de errores específicos
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "Please try again later:" + error,
            });
        }
    }
}