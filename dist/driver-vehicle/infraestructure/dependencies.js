"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegisterDVController = exports.deleteRegisterDVUseCase = exports.registerDriver_VehicleController = exports.registerDriver_VehicleUseCase = exports.mysqlDriver_VehicleRepository = void 0;
const mysqlDriver_VehicleRepostitory_1 = require("./mysqlDriver-VehicleRepostitory");
const registerDriver_VehicleUseCase_1 = require("../application/registerDriver_VehicleUseCase");
const registerDriver_VehicleController_1 = require("./controllers/registerDriver_VehicleController");
const deleteRegisterDVUseCase_1 = require("../application/deleteRegisterDVUseCase");
const deleteRegisterDVController_1 = require("./controllers/deleteRegisterDVController");
exports.mysqlDriver_VehicleRepository = new mysqlDriver_VehicleRepostitory_1.MysqlDriver_VehicleRepository();
exports.registerDriver_VehicleUseCase = new registerDriver_VehicleUseCase_1.RegisterDriver_VehicleUseCase(exports.mysqlDriver_VehicleRepository);
exports.registerDriver_VehicleController = new registerDriver_VehicleController_1.RegisterDriver_VehicleController(exports.registerDriver_VehicleUseCase);
exports.deleteRegisterDVUseCase = new deleteRegisterDVUseCase_1.DeleteRegisterDVUseCase(exports.mysqlDriver_VehicleRepository);
exports.deleteRegisterDVController = new deleteRegisterDVController_1.DeleteRegisterDVController(exports.deleteRegisterDVUseCase);
//# sourceMappingURL=dependencies.js.map