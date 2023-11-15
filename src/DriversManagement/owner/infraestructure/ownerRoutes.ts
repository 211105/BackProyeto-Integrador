import express from "express";
import { 
    registerOwnerController} from "./dependencies";

export const ownerRoutes = express.Router();

ownerRoutes.post('/',registerOwnerController.post.bind(registerOwnerController));

