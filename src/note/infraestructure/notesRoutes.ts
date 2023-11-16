import express from "express";
import {
    createFileController,
    updateFileNameController,
    getFilesByUserController,
    deleteFileController,
     } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const noteRoutes = express.Router();

noteRoutes.post('/file/',createFileController.post.bind(createFileController))

noteRoutes.put('/file/:uuid',updateFileNameController.update.bind(updateFileNameController)) 

noteRoutes.get('/file/:user_uuid',getFilesByUserController.get.bind(getFilesByUserController))

noteRoutes.delete('/file/:uuid',deleteFileController.delete.bind(deleteFileController))  












