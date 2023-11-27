import express  from "express";
import { createCommentController, getCommnetsByDriverController, getRatingDriverController } from "./dependencies";

export const commentRouter = express.Router();

commentRouter.post('/', createCommentController.post.bind(createCommentController));

commentRouter.get('/:driver_uuid', getCommnetsByDriverController.get.bind(getCommnetsByDriverController));

commentRouter.get('/rating/:driver_uuid', getRatingDriverController.get.bind(getRatingDriverController));


