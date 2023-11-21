"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMarkController = exports.listMarkUseCase = exports.createMarkController = exports.createMarkUseCase = exports.mysqlMarkRepository = void 0;
const createMarkUseCase_1 = require("../application/createMarkUseCase");
const listMarksUseCase_1 = require("../application/listMarksUseCase");
const createMarkController_1 = require("./controllers/createMarkController");
const listMarksController_1 = require("./controllers/listMarksController");
const mysqlMarkRepository_1 = require("./mysqlMarkRepository");
exports.mysqlMarkRepository = new mysqlMarkRepository_1.MysqlMarkRepository();
exports.createMarkUseCase = new createMarkUseCase_1.CreateMarkUseCase(exports.mysqlMarkRepository);
exports.createMarkController = new createMarkController_1.CreateMarkController(exports.createMarkUseCase);
exports.listMarkUseCase = new listMarksUseCase_1.ListMarkUseCase(exports.mysqlMarkRepository);
exports.listMarkController = new listMarksController_1.ListMarkController(exports.listMarkUseCase);
//# sourceMappingURL=dependencies.js.map