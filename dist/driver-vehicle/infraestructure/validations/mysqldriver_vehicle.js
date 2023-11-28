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
exports.statusVehicle = exports.statusDriver = exports.doesVehicleExist = exports.doesDriverExist = void 0;
const connection_1 = require("../../../database/connection");
function doesDriverExist(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkDriverSql = `
            SELECT COUNT(*) as driverCount
            FROM drivers
            WHERE uuid = ?;
        `;
            const [driverResults] = yield (0, connection_1.query)(checkDriverSql, [uuid]);
            return driverResults[0].driverCount > 0;
        }
        catch (error) {
            console.error("Error during driver existence check:", error);
            throw new Error("Error during driver existence check");
        }
    });
}
exports.doesDriverExist = doesDriverExist;
function doesVehicleExist(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkVehicleSql = `
            SELECT COUNT(*) as vehicleCount
            FROM vehicles
            WHERE uuid = ?;
        `;
            const [vehicleResults] = yield (0, connection_1.query)(checkVehicleSql, [uuid]);
            return vehicleResults[0].vehicleCount > 0;
        }
        catch (error) {
            console.error("Error during vehicle existence check:", error);
            throw new Error("Error during vehicle existence check");
        }
    });
}
exports.doesVehicleExist = doesVehicleExist;
function statusDriver(driver_uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkDriverSql = `
            SELECT COUNT(*) as driverCount
            FROM drivers
            WHERE uuid = ? AND status_moto_selection = false;
        `;
            const [driverResults] = yield (0, connection_1.query)(checkDriverSql, [driver_uuid]);
            return driverResults[0].driverCount > 0;
        }
        catch (error) {
            console.error("Error during vehicle existence check:", error);
            throw new Error("Error during vehicle existence check");
        }
    });
}
exports.statusDriver = statusDriver;
function statusVehicle(vehicle_uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkVehicleSql = `
            SELECT COUNT(*) as vehicleCount
            FROM vehicles
            WHERE uuid = ? AND status_driver_selection = false;
        `;
            const [vehicleResults] = yield (0, connection_1.query)(checkVehicleSql, [vehicle_uuid]);
            return vehicleResults[0].vehicleCount > 0;
        }
        catch (error) {
            console.error("Error during vehicle existence check:", error);
            throw new Error("Error during vehicle existence check");
        }
    });
}
exports.statusVehicle = statusVehicle;
//# sourceMappingURL=mysqldriver_vehicle.js.map