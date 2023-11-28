import { Request, Response } from "express";
import { RegisterDriver_VehicleUseCase } from "../../application/registerDriver_VehicleUseCase";
import { Driver_Vehicle,RegisterDriverVehicle } from "../../domain/driver_vehicle";
import { doesDriverExist, doesVehicleExist, statusDriver, statusVehicle } from '../validations/mysqldriver_vehicle';

export class RegisterDriver_VehicleController {
    constructor(readonly registerDriver_VehicleUseCase: RegisterDriver_VehicleUseCase) {}

    async post(req: Request, res: Response) {
        try {
            let { driver_uuid, vehicle_uuid } = req.body;

            const driverUuidRegistered = await doesDriverExist(driver_uuid);
            if (!driverUuidRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El driver_uuid no se encuentra en la base de datos.',
                });
            }
            const VehicleExist = await doesVehicleExist(vehicle_uuid);
            if (!VehicleExist) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El vechile_uuid no se encuentra en la base de datos.',
                });
            }
            const driver = await statusDriver(driver_uuid);
            if (!driver) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El conductor ya tiene un vehiculo asignado',
                });
            }
            const vehicle = await statusVehicle(vehicle_uuid);
            if (!vehicle) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El vehiculo ya tiene un conductor asignado',
                });
            }

            const registerDriver_VehicleResult = await this.registerDriver_VehicleUseCase.post(driver_uuid, vehicle_uuid, true);

            if (registerDriver_VehicleResult instanceof RegisterDriverVehicle) {
                return res.status(201).send({
                    status: 'success',
                    data: {
                        uuid:registerDriver_VehicleResult.uuid,
                        driver_uuid:registerDriver_VehicleResult.driver_uuid,
                        vehicle_uuid:registerDriver_VehicleResult.vehicle_uuid,
                        status:registerDriver_VehicleResult.status,
                        dataDriver:registerDriver_VehicleResult.dataDriver,
                        dataVechile:registerDriver_VehicleResult.dataVehicle,
                    },
                });

            } else {
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Driver.',
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
                message: "An error occurred while update the user.",
            });
        }
    }
}
