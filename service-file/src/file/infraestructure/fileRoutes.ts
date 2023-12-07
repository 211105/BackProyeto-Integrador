import express from "express";
import { 
    createFileController,
    updateFileController,
    getFilesByFolderController,
    deleteFileController } from "./dependencies";
import { Request, Response } from "express";


export const fileRoutes = express.Router();

fileRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

fileRoutes.post('/',createFileController.post.bind(createFileController))

fileRoutes.put('/',updateFileController.update.bind(updateFileController))

fileRoutes.get('/:notes_uuid',getFilesByFolderController.get.bind(getFilesByFolderController))

fileRoutes.delete('/:uuid',deleteFileController.delete.bind(deleteFileController))

