import express from "express";
import { 
    createFileController,
    updateFileController,
    getFilesByFolderController,
    deleteFileController } from "./dependencies";
import { Request, Response } from "express";
import { validateToken } from "../../helpers/veryfyToken";


export const fileRoutes = express.Router();

fileRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

fileRoutes.post('/',validateToken,createFileController.post.bind(createFileController))

fileRoutes.put('/',validateToken,updateFileController.update.bind(updateFileController))

fileRoutes.get('/:notes_uuid',validateToken,getFilesByFolderController.get.bind(getFilesByFolderController))

fileRoutes.delete('/:uuid',validateToken,deleteFileController.delete.bind(deleteFileController))

