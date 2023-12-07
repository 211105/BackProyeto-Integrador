"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.expenseRouter = express_1.default.Router();
exports.expenseRouter.get('/rutine/', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
exports.expenseRouter.post('/', dependencies_1.createExpenseController.post.bind(dependencies_1.createExpenseController));
exports.expenseRouter.put('/amount/', dependencies_1.updateAmountExpenseController.update.bind(dependencies_1.updateAmountExpenseController));
exports.expenseRouter.delete('/:uuid', dependencies_1.deleteExpenseByUuidController.delete.bind(dependencies_1.deleteExpenseByUuidController));
exports.expenseRouter.get('/:weekly_amount_uuid', dependencies_1.getExpensesByWeeklyController.get.bind(dependencies_1.getExpensesByWeeklyController));
//# sourceMappingURL=expenseRoutes.js.map