"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const veryfyToken_1 = require("../../helpers/veryfyToken");
exports.expenseRouter = express_1.default.Router();
exports.expenseRouter.get('/rutine/', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
exports.expenseRouter.post('/', veryfyToken_1.validateToken, dependencies_1.createExpenseController.post.bind(dependencies_1.createExpenseController));
exports.expenseRouter.put('/amount/', veryfyToken_1.validateToken, dependencies_1.updateAmountExpenseController.update.bind(dependencies_1.updateAmountExpenseController));
exports.expenseRouter.delete('/:uuid', veryfyToken_1.validateToken, dependencies_1.deleteExpenseByUuidController.delete.bind(dependencies_1.deleteExpenseByUuidController));
exports.expenseRouter.get('/:weekly_amount_uuid', veryfyToken_1.validateToken, dependencies_1.getExpensesByWeeklyController.get.bind(dependencies_1.getExpensesByWeeklyController));
//# sourceMappingURL=expenseRoutes.js.map