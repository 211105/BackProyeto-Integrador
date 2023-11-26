import express from "express";
import { 
    consultationPromController
 } from "./dependencies";

export const botRoutes = express.Router();

botRoutes.post('/',consultationPromController.post.bind(consultationPromController));







