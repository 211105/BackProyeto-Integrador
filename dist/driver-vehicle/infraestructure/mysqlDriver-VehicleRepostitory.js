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
exports.MysqlDriver_VehicleRepository = void 0;
const connection_1 = require("../../database/connection");
const driver_vehicle_1 = require("../domain/driver_vehicle");
class MysqlDriver_VehicleRepository {
    registerDriver_Vehicle(uuid, driver_uuid, vehicle_uuid, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driverInfoSql = `SELECT * FROM drivers WHERE uuid = ?;`;
                const [driverInfo] = yield (0, connection_1.query)(driverInfoSql, [driver_uuid]);
                const vehicleInfoSql = `SELECT * FROM vehicles WHERE uuid = ?;`;
                const [vehicleInfo] = yield (0, connection_1.query)(vehicleInfoSql, [vehicle_uuid]);
                let sql = "INSERT INTO drivers_vehicles(uuid, driver_uuid, vehicle_uuid, status) VALUES (?, ?, ?, ?)";
                const params = [uuid, driver_uuid, vehicle_uuid, status];
                console.log("Executing SQL query:", sql, "with parameters:", params);
                const [result] = yield (0, connection_1.query)(sql, params);
                sql = "UPDATE drivers SET status_moto_selection = true WHERE uuid = ?";
                yield (0, connection_1.query)(sql, [driver_uuid]);
                sql = "UPDATE vehicles SET status_driver_selection = true WHERE uuid = ?";
                yield (0, connection_1.query)(sql, [vehicle_uuid]);
                const driverVehicleData = new driver_vehicle_1.Driver_Vehicle(uuid, driver_uuid, vehicle_uuid, status);
                return new driver_vehicle_1.RegisterDriverVehicle(uuid, driver_uuid, vehicle_uuid, status, driverInfo[0], vehicleInfo[0]);
            }
            catch (error) {
                console.error("Error executing SQL query:", error);
                return error;
            }
        });
    }
    deleteRegisterDV(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(uuid);
            try {
                const [recordData] = yield (0, connection_1.query)('SELECT driver_uuid, vehicle_uuid FROM drivers_vehicles WHERE uuid = ?', [uuid]);
                if (!recordData || recordData.length === 0) {
                    return "El registro con el UUID especificado no existe.";
                }
                const [driverData] = yield (0, connection_1.query)('SELECT * FROM drivers WHERE uuid = ?', [recordData[0].driver_uuid]);
                const [vehicleData] = yield (0, connection_1.query)('SELECT * FROM vehicles WHERE uuid = ?', [recordData[0].vehicle_uuid]);
                const deleteSql = "DELETE FROM drivers_vehicles WHERE uuid = ?";
                const deleteParams = [uuid];
                console.log("Executing SQL query:", deleteSql, "with parameters:", deleteParams);
                const [deleteResult] = yield (0, connection_1.query)(deleteSql, deleteParams);
                if (driverData && driverData.length > 0) {
                    try {
                        const updateDriverSql = "UPDATE drivers SET status_moto_selection = false WHERE uuid = ?";
                        yield (0, connection_1.query)(updateDriverSql, [recordData[0].driver_uuid]);
                    }
                    catch (error) {
                        console.error("Error updating driver status:", error);
                        return error;
                    }
                }
                if (vehicleData && vehicleData.length > 0) {
                    try {
                        const updateVehicleSql = "UPDATE vehicles SET status_driver_selection = false WHERE uuid = ?";
                        yield (0, connection_1.query)(updateVehicleSql, [recordData[0].vehicle_uuid]);
                    }
                    catch (error) {
                        console.error("Error updating vehicle status:", error);
                        return error;
                    }
                }
                if (deleteResult.affectedRows > 0) {
                    return "El registro y sus asociaciones se han actualizado correctamente.";
                }
                else {
                    return "El registro con el UUID especificado no existe en la tabla drivers_vehicles.";
                }
            }
            catch (error) {
                console.error("Error executing SQL query:", error);
                return error;
            }
        });
    }
}
exports.MysqlDriver_VehicleRepository = MysqlDriver_VehicleRepository;
//# sourceMappingURL=mysqlDriver-VehicleRepostitory.js.map