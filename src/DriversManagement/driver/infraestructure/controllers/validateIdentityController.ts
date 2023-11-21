import { ValidateIdentityUseCase } from "../../application/validateIdentityUseCase";
import { Request, Response } from "express";
import { detectText, validateFields } from '../../../../helpers/validationIdentity';
import { UploadedFile } from 'express-fileupload';
import uploadToFirebase from '../../../../helpers/saveImages';
import { getDriverDataByUuid } from '../validations/drivermysql';
import { doesDriverExist } from '../validations/drivermysql';


export class ValidateIdentityController {
    constructor(readonly validateIdentityUseCase: ValidateIdentityUseCase) { }

    async update(req: Request, res: Response) {
        try {
            let { uuid } = req.params;

            // Verificar si el uuid del conductor existe
            const isDriverExist = await doesDriverExist(uuid);
            if (!isDriverExist) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Conductor no encontrado para el uuid proporcionado.',
                });
            }


            if (!req.files || !req.files.url_identification) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No image file uploaded url_photography.',
                });
            }


            const driverData = await getDriverDataByUuid(uuid); //Trae los datos del usuario para la validacion
            // Castear el archivo a UploadedFile (express-fileupload)
            const photoFile = req.files.url_identification as UploadedFile;
            const imageBuffer = photoFile.data.toString('base64');
            if (driverData) {

                // Detectar texto en la imagen
                const extractedText = await detectText(imageBuffer);

                // Validar campos
                const isValid = validateFields(extractedText, {
                    name: driverData.name,
                    surname: driverData.surname,
                    second_surname: driverData.second_surname,
                    identification_number: driverData.identification_number,
                });

                if (!isValid) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Validation failed. Fields do not match extracted text.',
                    });
                }
                
            }
            const url_identification = await uploadToFirebase(photoFile);
            console.log(url_identification);

            let validateIdentity = await this.validateIdentityUseCase.update( uuid,url_identification);

            if(validateIdentity){
                return res.status(200).send({
                    status: "succes",
                    data: {
                        validateIdentity,
                        message:"La identificacion se ha validado correctamente"
                    }
                })
            }else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found"
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
                message: "An error occurred while adding the Driver."
            });
        }
    }
}