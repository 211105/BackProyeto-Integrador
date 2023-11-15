import { Request, Response } from "express";
import { RegisterOwnerUseCase } from "../../application/registerOwnerUseCase";
import { UploadedFile } from 'express-fileupload';
import uploadToFirebase from '../../../../helpers/saveImages';
import { Owner } from "../../domain/owner";

export class RegisterOwnerController {
    constructor(readonly registerOwnerUseCase: RegisterOwnerUseCase) { }

    async post(req: Request, res: Response) {
        try {

            let { name, surname, second_surname, email, password, phone_number } = req.body;

            if (!req.files || !req.files.img_url) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No image file uploaded img_url.',
                });
            }

            // Castear el archivo a UploadedFile (express-fileupload)
            const url = req.files.img_url as UploadedFile;
            const img_url = await uploadToFirebase(url);
            console.log(img_url);

            let registerOwner = await this.registerOwnerUseCase.post(
                name,
                surname,
                second_surname,
                email,
                password,
                phone_number,
                img_url,
                "Owner",
                false
            )
            if (registerOwner instanceof Owner) {
                return res.status(201).send({
                    status: 'success',
                    data: {
                        id: registerOwner.uuid,
                        name: registerOwner.name,
                        surname: registerOwner.surname,
                        second_surname: registerOwner.second_surname,
                        email: registerOwner.email,
                        password: registerOwner.password,
                        phone: registerOwner.phone_number,
                        img_url: registerOwner.img_url,
                        type_user: registerOwner.type_user,
                        status: registerOwner.status,
                    },
                });

            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Owner.',
                });
            }

        } catch (error) {
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
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}