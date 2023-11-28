import { Request,Response } from "express";
import { UpdateVehicleByUuidUseCase } from "../../application/updateVehicleByUuidUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";

export class UpdateVehicleByuUuidController {
    constructor(readonly updateVehicleByUuidUseCase: UpdateVehicleByUuidUseCase){}

    async update(req: Request, res: Response){
        try {
            let {uuid,brand,model, plate_number,name_association,vin} = req.body;


            let url_img: undefined | string;
            if (!req.files || !req.files.url_img) {
                url_img = undefined;
            } else {
                const imgFile = req.files.url_img as UploadedFile;
                url_img = await uploadToFirebase(imgFile);
            }

            if ( brand === undefined && model === undefined && plate_number === undefined && name_association === undefined && vin === undefined && url_img === undefined) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: "no hay cambios"
                    }
                })
            }

            let updateVehicle = await this.updateVehicleByUuidUseCase.update(uuid,brand,model,plate_number,name_association,vin,url_img);
            if (updateVehicle) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_driver: updateVehicle
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Vehicle not found "
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
                message: "An error occurred while update the vehicle."
            });
        }
    }
}