"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwnerController = exports.deleteOwnerUseCase = exports.updateOwnerController = exports.updateOwnerUseCase = exports.registerOwnerController = exports.registerOwnerUseCase = exports.mysqlOwnerRepository = void 0;
const mysqlOwnerRepository_1 = require("./mysqlOwnerRepository");
const registerOwnerUseCase_1 = require("../application/registerOwnerUseCase");
const registerOwnerController_1 = require("./controllers/registerOwnerController");
const updateOwnerUseCase_1 = require("../application/updateOwnerUseCase");
const updateOwnerController_1 = require("./controllers/updateOwnerController");
const deleteOwnerUseCase_1 = require("../application/deleteOwnerUseCase");
const deleteOwnerController_1 = require("./controllers/deleteOwnerController");
exports.mysqlOwnerRepository = new mysqlOwnerRepository_1.MysqlOwnerRepository();
exports.registerOwnerUseCase = new registerOwnerUseCase_1.RegisterOwnerUseCase(exports.mysqlOwnerRepository);
exports.registerOwnerController = new registerOwnerController_1.RegisterOwnerController(exports.registerOwnerUseCase);
exports.updateOwnerUseCase = new updateOwnerUseCase_1.UpdateOwnerUseCase(exports.mysqlOwnerRepository);
exports.updateOwnerController = new updateOwnerController_1.UpdateOwnerController(exports.updateOwnerUseCase);
exports.deleteOwnerUseCase = new deleteOwnerUseCase_1.DeleteOwnerUseCase(exports.mysqlOwnerRepository);
exports.deleteOwnerController = new deleteOwnerController_1.DeleteOwnerControlller(exports.deleteOwnerUseCase);
//# sourceMappingURL=dependencies.js.map