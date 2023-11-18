import express from "express";
import { 
    createFileController,
    updateFileController,
    getFilesByFolderController } from "./dependencies";

export const fileRoutes = express.Router();

fileRoutes.post('/',createFileController.post.bind(createFileController))

fileRoutes.put('/',updateFileController.update.bind(updateFileController))

fileRoutes.get('/:folder_uuid',getFilesByFolderController.get.bind(getFilesByFolderController))

