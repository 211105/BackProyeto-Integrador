"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDriver_VehicleController = void 0;
const driver_vehicle_1 = require("../../domain/driver_vehicle");
const mysqldriver_vehicle_1 = require("../validations/mysqldriver_vehicle");
class RegisterDriver_VehicleController {
    constructor(registerDriver_VehicleUseCase) {
        this.registerDriver_VehicleUseCase = registerDriver_VehicleUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { driver_uuid, vehicle_uuid } = req.body;
                const driverUuidRegistered = yield (0, mysqldriver_vehicle_1.doesDriverExist)(driver_uuid);
                if (!driverUuidRegistered) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'El driver_uuid no se encuentra en la base de datos.',
                    });
                }
                const VehicleExist = yield (0, mysqldriver_vehicle_1.doesVehicleExist)(vehicle_uuid);
                if (!VehicleExist) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'El vechile_uuid no se encuentra en la base de datos.',
                    });
                }
                const driver = yield (0, mysqldriver_vehicle_1.statusDriver)(driver_uuid);
                if (!driver) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'El conductor ya tiene un vehiculo asignado',
                    });
                }
                const vehicle = yield (0, mysqldriver_vehicle_1.statusVehicle)(vehicle_uuid);
                if (!vehicle) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'El vehiculo ya tiene un conductor asignado',
                    });
                }
                const registerDriver_VehicleResult = yield this.registerDriver_VehicleUseCase.post(driver_uuid, vehicle_uuid, true);
                if (registerDriver_VehicleResult instanceof driver_vehicle_1.RegisterDriverVehicle) {
                    return res.status(201).send({
                        status: 'success',
                        data: {
                            uuid: registerDriver_VehicleResult.uuid,
                            driver_uuid: registerDriver_VehicleResult.driver_uuid,
                            vehicle_uuid: registerDriver_VehicleResult.vehicle_uuid,
                            status: registerDriver_VehicleResult.status,
                            dataDriver: registerDriver_VehicleResult.dataDriver,
                            dataVechile: registerDriver_VehicleResult.dataVehicle,
                        },
                    });
                }
                else {
                    return res.status(500).send({
                        status: 'error',
                        message: 'An unexpected error occurred while registering the Driver.',
                    });
                }
            }
            catch (error) {
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
        });
    }
}
exports.RegisterDriver_VehicleController = RegisterDriver_VehicleController;
//# sourceMappingURL=registerDriver_VehicleController.js.map