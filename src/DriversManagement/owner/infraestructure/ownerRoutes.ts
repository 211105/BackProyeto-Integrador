import express from "express";
import { 
    registerOwnerController,
    updateOwnerController} from "./dependencies";

export const ownerRoutes = express.Router();

ownerRoutes.post('/',registerOwnerController.post.bind(registerOwnerController));

ownerRoutes.put('/update',updateOwnerController.update.bind(updateOwnerController));

