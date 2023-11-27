import { Request, Response } from "express";
import { DeleteRegisterDVUseCase } from "../../application/deleteRegisterDVUseCase";
import { Driver_Vehicle } from "../../domain/driver_vehicle";
import { doesDriverExist, doesVehicleExist, statusDriver, statusVehicle } from '../validations/mysqldriver_vehicle';

export class DeleteRegisterDVController {
    constructor(readonly deleteRegisterDVUseCase: DeleteRegisterDVUseCase) {}
 
    async delete(req: Request, res: Response) {
        try {
            let {uuid} = req.params;
            console.log(uuid);

            const deleteRegisterDV = await this.deleteRegisterDVUseCase.delete(uuid);


            if(deleteRegisterDV){
                return res.status(200).send({
                    status:'success delete',
                    data:{
                        deleteRegister:deleteRegisterDV
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Driver and Vehicle.',
                });
            }


        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message),
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the Driver and Vehicle.",
            });
        }
    }
}
