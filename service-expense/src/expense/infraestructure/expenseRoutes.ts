import express from "express";
import { 
    createExpenseController,
    updateAmountExpenseController,
    deleteExpenseByUuidController,
    getExpensesByWeeklyController
 } from "./dependencies";
 import { Request, Response } from "express";
 import { validateToken } from "../../helpers/veryfyToken";

 
export const expenseRouter = express.Router();

expenseRouter.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

expenseRouter.post('/',validateToken,createExpenseController.post.bind(createExpenseController));

expenseRouter.put('/amount/',validateToken,updateAmountExpenseController.update.bind(updateAmountExpenseController));

expenseRouter.delete('/:uuid',validateToken,deleteExpenseByUuidController.delete.bind(deleteExpenseByUuidController));

expenseRouter.get('/:weekly_amount_uuid',validateToken,getExpensesByWeeklyController.get.bind(getExpensesByWeeklyController));



