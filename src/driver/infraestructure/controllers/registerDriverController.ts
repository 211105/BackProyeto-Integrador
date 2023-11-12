import { Request, Response } from 'express';
import { RegisterDriverUseCase } from '../../application/registerDriverUseCase';
import { Driver } from '../../domain/driver';
import { UploadedFile } from 'express-fileupload';
import uploadToFirebase from '../../../helpers/saveImages';
import { detectText, validateFields } from '../../../helpers/validationIdentity'; // Cambiar la ruta según tu estructura
import { isEmailRegistered } from '../validations/drivermysql';

export class RegisterDriverController {
    constructor(readonly registerDriverUseCase: RegisterDriverUseCase) { }

    async post(req: Request, res: Response) {
        let { name, surname, second_surname, email, password, identification_number, phone } = req.body;

        if (!req.files || !req.files.url_photography) {
            return res.status(400).send({
                status: 'error',
                message: 'No image file uploaded url_photography.',
            });
        }
        if (!req.files || !req.files.url_identification) {
            return res.status(400).send({
                status: 'error',
                message: 'No image file uploaded url_identification.',
            });
        }



        const imgFile = req.files.url_identification as UploadedFile;
        const imageBuffer = imgFile.data.toString('base64');

        // Castear el archivo a UploadedFile (express-fileupload)
        const photoFile = req.files.url_photography as UploadedFile;

        try {
            // Detectar texto en la imagen
            const extractedText = await detectText(imageBuffer);

            // Validar campos
            const isValid = validateFields(extractedText, {
                name,
                surname,
                second_surname,
                identification_number,
            });

            if (!isValid) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Validation failed. Fields do not match extracted text.',
                });
            }

            // Verificar si el correo ya está registrado
            const emailRegistered = await isEmailRegistered(email);
            if (emailRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El correo electrónico ya está registrado en la base de datos.',
                });
            }

            // Continuar con la subida a Firebase y registro en la base de datos
            const url_identification = await uploadToFirebase(imgFile);
            console.log(url_identification);

            const url_photography = await uploadToFirebase(photoFile);
            console.log(url_photography);

            console.log("Se enviaron las imagenes")

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
            );
            console.log("pasooooo esto")

            if (registerDriver instanceof Driver) {
                return res.status(201).send({
                    status: 'success',
                    data: {
                        id: registerDriver.uuid,
                        name: registerDriver.name,
                        surname: registerDriver.surname,
                        second_surname: registerDriver.second_surname,
                        email: registerDriver.email,
                        password: registerDriver.password,
                        identification_number: registerDriver.identification_number,
                        phone: registerDriver.phone,
                        status: registerDriver.status,
                    },
                });
            
            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Driver.',
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
