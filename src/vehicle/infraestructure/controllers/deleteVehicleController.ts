import { Request,Response } from "express";
import {DeleteVehicleUseCase} from "../../application/deleteVehicleUseCase"

export class DeleteVehicleController{
    constructor(readonly deleteVehicleUseCase: DeleteVehicleUseCase){}

    async delete(req: Request, res: Response){

        try {
            let{uuid} = req.params;

            const deleteVehicle = await this.deleteVehicleUseCase.delete(uuid);

            if (deleteVehicle) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        delete_vehicle: deleteVehicle
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the vehicle."
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
                message: "An error occurred while adding the vehicle."
            });
        }
    }
}