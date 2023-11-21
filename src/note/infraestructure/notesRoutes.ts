import express from "express";
import {
    deleteFileController,
    createNoteController,
    updateNoteController,
    getNoteByUserController
     } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const noteRoutes = express.Router();


noteRoutes.delete('/:uuid',deleteFileController.delete.bind(deleteFileController))

noteRoutes.post('/create/',createNoteController.post.bind(createNoteController))

noteRoutes.put('/update/',updateNoteController.update.bind(updateNoteController))

noteRoutes.get('/:folder_uuid',getNoteByUserController.get.bind(getNoteByUserController))   












