import express from "express";
import { adActivityController, createMarkController, listActivitysController, listMarkController, userAssistController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";
import { Request, Response } from "express";

export const markRouter = express.Router();

markRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

markRouter.post('/',createMarkController.run.bind(createMarkController))
markRouter.get('/',listMarkController.run.bind(listMarkController))
markRouter.post('/assist',userAssistController.run.bind(userAssistController))
markRouter.get('/list/activity',listActivitysController.run.bind(listActivitysController))
markRouter.get('/activity/',adActivityController.run.bind(adActivityController))





