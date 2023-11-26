"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.markRouter = express_1.default.Router();
exports.markRouter.get('/rutine', (req, res) => { return res.status(201); });
exports.markRouter.post('/', dependencies_1.createMarkController.run.bind(dependencies_1.createMarkController));
exports.markRouter.get('/', dependencies_1.listMarkController.run.bind(dependencies_1.listMarkController));
exports.markRouter.post('/assist', dependencies_1.userAssistController.run.bind(dependencies_1.userAssistController));
//# sourceMappingURL=markRoutes.js.map