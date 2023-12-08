"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const veryfyToken_1 = require("../../helpers/veryfyToken");
exports.markRouter = express_1.default.Router();
exports.markRouter.get('/rutine', (req, res) => {
    res.status(200).send('Rutina ejecutáda con éxito');
});
exports.markRouter.post('/', veryfyToken_1.validateToken, dependencies_1.createMarkController.run.bind(dependencies_1.createMarkController));
exports.markRouter.get('/', veryfyToken_1.validateToken, dependencies_1.listMarkController.run.bind(dependencies_1.listMarkController));
exports.markRouter.post('/assist', veryfyToken_1.validateToken, dependencies_1.userAssistController.run.bind(dependencies_1.userAssistController));
exports.markRouter.get('/list/activity', veryfyToken_1.validateToken, dependencies_1.listActivitysController.run.bind(dependencies_1.listActivitysController));
exports.markRouter.post('/activity/', veryfyToken_1.validateToken, dependencies_1.adActivityController.run.bind(dependencies_1.adActivityController));
//# sourceMappingURL=markRoutes.js.map