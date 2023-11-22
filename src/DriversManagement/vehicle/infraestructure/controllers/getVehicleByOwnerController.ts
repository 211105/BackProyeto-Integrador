import { Request,Response } from "express";
import { GetVehicleByOwnerUseCase } from "../../application/getVechileByOwnerUseCase";

export class GetVehicleByOwnerController{
    constructor(readonly getVehicleByOwnerUseCase: GetVehicleByOwnerUseCase){}

    async get(req: Request, res: Response){
        try {
            let{owner_uuid} = req.params;

            const getVehicleByOwner = await this.getVehicleByOwnerUseCase.get(owner_uuid);

            if (getVehicleByOwner) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        vehicle: getVehicleByOwner
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
                message: "An error occurred while update the Vehicle."
            });
        }
    }
}