import express from "express";
import { createMarkController, listMarkController, userAssistController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";


export const markRouter = express.Router();

markRouter.get('/rutine', (req,res) => {return res.status(200)})
markRouter.post('/',createMarkController.run.bind(createMarkController))
markRouter.get('/',listMarkController.run.bind(listMarkController))
markRouter.post('/assist',userAssistController.run.bind(userAssistController))

