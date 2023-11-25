import express from "express";
import { 
    createWeeklyAmountController,
    getWeeklyAmountByUserController,
    updateStatusByUserController,
    updateWeeklyAmountController
 } from "./dependencies";

export const weeklyAmountRoutes = express.Router();

weeklyAmountRoutes.post('/',createWeeklyAmountController.post.bind(createWeeklyAmountController));

weeklyAmountRoutes.get('/:user_uuid',getWeeklyAmountByUserController.get.bind(getWeeklyAmountByUserController));

weeklyAmountRoutes.put('/verify/:user_uuid',updateStatusByUserController.update.bind(updateStatusByUserController));

weeklyAmountRoutes.put('/',updateWeeklyAmountController.update.bind(updateWeeklyAmountController));






