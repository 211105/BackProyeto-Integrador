import express from "express";
import { 
    createWeeklyAmountController,
    getWeeklyAmountByUserController,
    updateStatusByUserController,
    updateWeeklyAmountController
 } from "./dependencies";
 import { Request, Response } from "express";
 
export const weeklyAmountRoutes = express.Router();

weeklyAmountRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

weeklyAmountRoutes.post('/',createWeeklyAmountController.post.bind(createWeeklyAmountController));

weeklyAmountRoutes.get('/:user_uuid',getWeeklyAmountByUserController.get.bind(getWeeklyAmountByUserController));

weeklyAmountRoutes.put('/verify/:user_uuid',updateStatusByUserController.update.bind(updateStatusByUserController));

weeklyAmountRoutes.put('/',updateWeeklyAmountController.update.bind(updateWeeklyAmountController));






