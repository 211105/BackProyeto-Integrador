import express from "express";
import { 
    createWeeklyAmountController,
    getWeeklyAmountByUserController,
    updateStatusByUserController,
    updateWeeklyAmountController
} from "./dependencies";
import { Request, Response } from "express";
import { validateToken } from "../../helpers/veryfyToken";
 
export const weeklyAmountRoutes = express.Router();

weeklyAmountRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

weeklyAmountRoutes.post('/',validateToken,createWeeklyAmountController.post.bind(createWeeklyAmountController));

weeklyAmountRoutes.get('/:user_uuid',validateToken,getWeeklyAmountByUserController.get.bind(getWeeklyAmountByUserController));

weeklyAmountRoutes.put('/verify/:user_uuid',validateToken,updateStatusByUserController.update.bind(updateStatusByUserController));

weeklyAmountRoutes.put('/',validateToken,updateWeeklyAmountController.update.bind(updateWeeklyAmountController));








