import express  from "express";
import { 
    createFolderController,
    updateFolderController,
    deleteFolderController,
    getFolderByUserController} from "./dependencies";


export const folderRoutes = express.Router();


folderRoutes.post('/',createFolderController.post.bind(createFolderController));

folderRoutes.put('/',updateFolderController.update.bind(updateFolderController));

folderRoutes.delete('/:uuid',deleteFolderController.delete.bind(deleteFolderController));

folderRoutes.get('/:user_uuid',getFolderByUserController.get.bind(getFolderByUserController));



