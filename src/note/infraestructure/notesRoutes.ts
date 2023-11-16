import express from "express";
import {
    createFileController,
    updateFileNameController
     } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const noteRoutes = express.Router();

noteRoutes.post('/file/',createFileController.post.bind(createFileController))

noteRoutes.put('/:uuid',updateFileNameController.update.bind(updateFileNameController)) 













