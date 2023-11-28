"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver_vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.driver_vehicleRoutes = express_1.default.Router();
exports.driver_vehicleRoutes.post('/', dependencies_1.registerDriver_VehicleController.post.bind(dependencies_1.registerDriver_VehicleController));
exports.driver_vehicleRoutes.delete('/:uuid', dependencies_1.deleteRegisterDVController.delete.bind(dependencies_1.deleteRegisterDVController));
//# sourceMappingURL=driver-vehicleRoutes.js.map