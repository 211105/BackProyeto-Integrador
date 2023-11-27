import express from "express";
import { 
    createExpenseController,
    updateAmountExpenseController,
    deleteExpenseByUuidController,
    getExpensesByWeeklyController
 } from "./dependencies";
 import { Request, Response } from "express";

 
export const expenseRouter = express.Router();

expenseRouter.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

expenseRouter.post('/',createExpenseController.post.bind(createExpenseController));

expenseRouter.put('/amount/',updateAmountExpenseController.update.bind(updateAmountExpenseController));

expenseRouter.delete('/:uuid',deleteExpenseByUuidController.delete.bind(deleteExpenseByUuidController));

expenseRouter.get('/:weekly_amount_uuid',getExpensesByWeeklyController.get.bind(getExpensesByWeeklyController));



