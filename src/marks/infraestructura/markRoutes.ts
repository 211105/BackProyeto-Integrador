import express from "express";
import { createMarkController, listMarkController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";


export const markRouter = express.Router();


markRouter.post('/',createMarkController.run.bind(createMarkController))
markRouter.get('/',listMarkController.run.bind(listMarkController))
