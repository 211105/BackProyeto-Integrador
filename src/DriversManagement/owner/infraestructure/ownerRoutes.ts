import express from "express";
import { 
    registerOwnerController,
    updateOwnerController,
    deleteOwnerController} from "./dependencies";

export const ownerRoutes = express.Router();

ownerRoutes.post('/',registerOwnerController.post.bind(registerOwnerController));

ownerRoutes.put('/update',updateOwnerController.update.bind(updateOwnerController));

ownerRoutes.delete('/:uuid',deleteOwnerController.delete.bind(deleteOwnerController));

