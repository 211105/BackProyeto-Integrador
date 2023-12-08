"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weeklyAmountRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const veryfyToken_1 = require("../../helpers/veryfyToken");
exports.weeklyAmountRoutes = express_1.default.Router();
exports.weeklyAmountRoutes.get('/rutine/', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
exports.weeklyAmountRoutes.post('/', veryfyToken_1.validateToken, dependencies_1.createWeeklyAmountController.post.bind(dependencies_1.createWeeklyAmountController));
exports.weeklyAmountRoutes.get('/:user_uuid', veryfyToken_1.validateToken, dependencies_1.getWeeklyAmountByUserController.get.bind(dependencies_1.getWeeklyAmountByUserController));
exports.weeklyAmountRoutes.put('/verify/:user_uuid', veryfyToken_1.validateToken, dependencies_1.updateStatusByUserController.update.bind(dependencies_1.updateStatusByUserController));
exports.weeklyAmountRoutes.put('/', veryfyToken_1.validateToken, dependencies_1.updateWeeklyAmountController.update.bind(dependencies_1.updateWeeklyAmountController));
//# sourceMappingURL=weekly_amountRouter.js.map