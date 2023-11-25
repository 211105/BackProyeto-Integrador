import express from "express";
import { 
    createExpenseController,
    updateAmountExpenseController,
    deleteExpenseByUuidController,
    getExpensesByWeeklyController
 } from "./dependencies";

export const expenseRouter = express.Router();

expenseRouter.post('/',createExpenseController.post.bind(createExpenseController));

expenseRouter.put('/amount/',updateAmountExpenseController.update.bind(updateAmountExpenseController));

expenseRouter.delete('/:uuid',deleteExpenseByUuidController.delete.bind(deleteExpenseByUuidController));

expenseRouter.get('/:weekly_amount_uuid',getExpensesByWeeklyController.get.bind(getExpensesByWeeklyController));



