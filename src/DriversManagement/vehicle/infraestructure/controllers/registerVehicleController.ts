import { Request, Response} from "express";
import { RegisterVehicleUseCase } from "../../application/registerVehicleUseCase";
import { Vehicle } from "../../domain/vehicle";
import { UploadedFile } from 'express-fileupload';
import uploadToFirebase from '../../../../helpers/saveImages';
import { isPlateNumberRegistered } from "../validations/vehiclemysql";
import { isOwnerUuidRegistered } from "../validations/vehiclemysql";

export class RegisterVehicleController{
    constructor( readonly registerVehicleUseCase: RegisterVehicleUseCase){}


    async post(req: Request, res: Response){
        try {
            let{brand,model,plate_number,name_association,vin,owner_uuid} = req.body;

            if (!req.files || !req.files.url_img) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No image file uploaded url_img_vehicle.',
                });
            }
            const plateNumberRegistered = await isPlateNumberRegistered(plate_number);
            
            if (plateNumberRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'La matricula ya esta registrada',
                });
            }
            const OwnerUuidRegistered = await isOwnerUuidRegistered(owner_uuid);
            if (OwnerUuidRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'No existe el Dueño',
                });
            }

            // Castear el archivo a UploadedFile (express-fileupload)
            const fileVehicle= req.files.url_img as UploadedFile;
            const url_img = await uploadToFirebase(fileVehicle);
            console.log(url_img);

            const registerVehicle = await this.registerVehicleUseCase.post(
                brand,
                model,
                plate_number,
                name_association,
                vin,
                url_img,
                owner_uuid,
                false,
                false
            );
            if(registerVehicle instanceof Vehicle){
                return res.status(200).send({
                    status:'success',
                    data:{
                        uuid:registerVehicle.uuid,
                        brand:registerVehicle.brand,
                        model:registerVehicle.model,
                        plate_number:registerVehicle.plate_number,
                        name_association:registerVehicle.name_association,
                        vin:registerVehicle.vin,
                        url_img:registerVehicle.url_img,
                        owner_uuid:registerVehicle.owner_uuid,
                        status:registerVehicle.status,
                        status_driver_selection:registerVehicle.status_driver_selection
                    }
                })
            }
            else {
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