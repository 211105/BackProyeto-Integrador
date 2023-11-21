import { Request,Response } from "express";
import { UpdateDriverUseCase} from "../../application/updateDriverUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../../helpers/saveImages";
import { isEmailRegistered } from '../validations/drivermysql';

export class UpdateDriverController {
    constructor(readonly updateDriverUseCase: UpdateDriverUseCase){}

    async update(req: Request, res: Response){
        try {
            let {uuid,email,phone} = req.body;

            // Verificar si el correo ya está registrado
            const emailRegistered = await isEmailRegistered(email);
            if (emailRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El correo electrónico ya está registrado en la base de datos.',
                });
            }

            let url_photography: undefined | string;
            if (!req.files || !req.files.url_photography) {
                url_photography = undefined;
            } else {
                const imgFile = req.files.url_photography as UploadedFile;
                url_photography = await uploadToFirebase(imgFile);
            }

            if ( email === undefined && phone === undefined && url_photography === undefined) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: "no hay cambios"
                    }
                })
            }

            let updateDriver = await this.updateDriverUseCase.update(uuid, email, url_photography, phone);
            if (updateDriver) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_driver: updateDriver
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Driver not found "
                });
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
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the user."
            });
        }
    }
}