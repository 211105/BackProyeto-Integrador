"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDriverVehicle = exports.Driver_Vehicle = void 0;
class Driver_Vehicle {
    constructor(uuid, driver_uuid, vehicle_uuid, status) {
        this.uuid = uuid;
        this.driver_uuid = driver_uuid;
        this.vehicle_uuid = vehicle_uuid;
        this.status = status;
    }
}
exports.Driver_Vehicle = Driver_Vehicle;
class RegisterDriverVehicle {
    constructor(uuid, driver_uuid, vehicle_uuid, status, dataDriver, dataVehicle) {
        this.uuid = uuid;
        this.driver_uuid = driver_uuid;
        this.vehicle_uuid = vehicle_uuid;
        this.status = status;
        this.dataDriver = dataDriver;
        this.dataVehicle = dataVehicle;
    }
}
exports.RegisterDriverVehicle = RegisterDriverVehicle;
//# sourceMappingURL=driver_vehicle.js.map