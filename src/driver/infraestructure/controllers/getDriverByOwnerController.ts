import { Request,Response } from "express";
import { GetDriverByOwnerUseCase } from "../../application/getDriversByOwnerUseCase";

export class GetDriverByOwnerController{
    constructor(readonly GetDriverByOwnerUseCase: GetDriverByOwnerUseCase){}

    async get(req: Request, res: Response){
        try {
            let{owner_uuid} = req.params;

            const getDriverByOwner = await this.GetDriverByOwnerUseCase.get(owner_uuid);

            if (getDriverByOwner) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        drivers: getDriverByOwner
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
                message: "An error occurred while update the Driver."
            });
        }
    }
}