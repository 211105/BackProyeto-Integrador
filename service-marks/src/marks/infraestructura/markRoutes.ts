import express from "express";
import { adActivityController, createMarkController, listActivitysController, listMarkController, userAssistController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";
import { Request, Response } from "express";

export const markRouter = express.Router();

markRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

markRouter.post('/',validateToken,createMarkController.run.bind(createMarkController))
markRouter.get('/',validateToken,listMarkController.run.bind(listMarkController))
markRouter.post('/assist',validateToken,userAssistController.run.bind(userAssistController))
markRouter.get('/list/activity',validateToken,listActivitysController.run.bind(listActivitysController))
markRouter.post('/activity/',validateToken,adActivityController.run.bind(adActivityController))





