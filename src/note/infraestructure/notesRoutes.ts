import express from "express";
import {
    createFileController,
    updateFileNameController,
    getFilesByUserController,
    deleteFileController,
    createNoteController,
    updateNoteController,
    getNoteByUserController
     } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const noteRoutes = express.Router();

noteRoutes.post('/file/',createFileController.post.bind(createFileController))

noteRoutes.put('/file/:uuid',updateFileNameController.update.bind(updateFileNameController)) 

noteRoutes.get('/file/:user_uuid',getFilesByUserController.get.bind(getFilesByUserController))

noteRoutes.delete('/file/:uuid',deleteFileController.delete.bind(deleteFileController))

noteRoutes.post('/',createNoteController.post.bind(createNoteController))

noteRoutes.put('/:uuid',updateNoteController.update.bind(updateNoteController))

noteRoutes.get('/:user_uuid',getNoteByUserController.get.bind(getNoteByUserController))   












