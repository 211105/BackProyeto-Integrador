import express from "express";
import {createFileController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const noteRoutes = express.Router();

noteRoutes.post('/file/',createFileController.post.bind(createFileController)) 












