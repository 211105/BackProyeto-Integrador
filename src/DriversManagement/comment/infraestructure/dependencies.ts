import { MysqlCommentRepository } from "./mysqlCommentRepository";

import { CreateCommentUseCase } from "../application/createCommentUseCase";
import { CreateCommentController } from "./controllers/createCommnetController";

import { GetCommnetsByDriverUseCase } from "../application/getCommnetsByDriverUseCase";
import { GetCommnetsByDriverController } from "./controllers/getCommnetsByDriverController";

import { GetRatingDriverUseCase } from "../application/getRatingDriverUseCase";
import { GetRatingDriverController } from "./controllers/getRatingDriverController";

export const mysqlCommentRepository = new MysqlCommentRepository();

export const createCommentUseCase = new CreateCommentUseCase(mysqlCommentRepository);
export const createCommentController = new CreateCommentController(createCommentUseCase);

export const getCommnetsByDriverUseCase = new GetCommnetsByDriverUseCase(mysqlCommentRepository);
export const getCommnetsByDriverController = new GetCommnetsByDriverController(getCommnetsByDriverUseCase);

export const getRatingDriverUseCase = new GetRatingDriverUseCase(mysqlCommentRepository);
export const getRatingDriverController = new GetRatingDriverController(getRatingDriverUseCase);