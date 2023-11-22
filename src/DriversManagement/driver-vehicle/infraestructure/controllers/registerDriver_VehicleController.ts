import { Request, Response } from "express";
import { RegisterDriver_VehicleUseCase } from "../../application/registerDriver_VehicleUseCase";
import { Driver_Vehicle } from "../../domain/driver_vehicle";
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
            if (driver) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El conductor ya tiene un vehiculo asignado',
                });
            }
            const vehicle = await statusVehicle(vehicle_uuid);
            if (!vehicle) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El vehiculo ya tiene un vehiculo asignado',
                });
            }

            const registerDriver_VehicleResult = await this.registerDriver_VehicleUseCase.post(driver_uuid, vehicle_uuid, true);

            if (registerDriver_VehicleResult instanceof Error) {
                // Manejar el caso de error
                return res.status(500).send({
                    status: 'error',
                    message: 'An unexpected error occurred while registering the Driver_Vehicle.',
                });
            }

            const registerDriver_Vehicle = (registerDriver_VehicleResult as { data: Driver_Vehicle; driver?: any; vehicle?: any }).data;
            const driverInfo = (registerDriver_VehicleResult as { data: Driver_Vehicle; driver?: any; vehicle?: any }).driver;
            const vehicleInfo = (registerDriver_VehicleResult as { data: Driver_Vehicle; driver?: any; vehicle?: any }).vehicle;

            return res.status(201).send({
                status: 'success',
                data: {
                    id: registerDriver_Vehicle.uuid,
                    driver_uuid: registerDriver_Vehicle.driver_uuid,
                    vehicle_uuid: registerDriver_Vehicle.vehicle_uuid,
                    status: registerDriver_Vehicle.status,
                    driver_info: driverInfo,
                    vehicle_info: vehicleInfo,
                },
            });

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
