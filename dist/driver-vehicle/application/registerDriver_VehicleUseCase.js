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
exports.RegisterDriver_VehicleUseCase = void 0;
const class_validator_1 = require("class-validator");
const driver_vehicles_1 = require("../domain/validations/driver_vehicles");
const uuid_1 = require("uuid");
class RegisterDriver_VehicleUseCase {
    constructor(driver_vehicleRepository) {
        this.driver_vehicleRepository = driver_vehicleRepository;
    }
    post(driver_uuid, vehicle_uuid, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            let data = new driver_vehicles_1.ValidatorRegister(miuuid, driver_uuid, vehicle_uuid);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const registerDriver_Vehicle = yield this.driver_vehicleRepository.registerDriver_Vehicle(miuuid, driver_uuid, vehicle_uuid, status);
                return registerDriver_Vehicle;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.RegisterDriver_VehicleUseCase = RegisterDriver_VehicleUseCase;
//# sourceMappingURL=registerDriver_VehicleUseCase.js.map