import express from "express";
import { 
    createFileController,
    updateFileController,
    getFilesByFolderController,
    deleteFileController } from "./dependencies";

export const fileRoutes = express.Router();

fileRoutes.post('/',createFileController.post.bind(createFileController))

fileRoutes.put('/',updateFileController.update.bind(updateFileController))

fileRoutes.get('/:notes_uuid',getFilesByFolderController.get.bind(getFilesByFolderController))

fileRoutes.delete('/:uuid',deleteFileController.delete.bind(deleteFileController))

