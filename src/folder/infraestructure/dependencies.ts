import { MysqlFolderRepostitory } from "./mysqlFolderRepository";

import { CreateFolderUseCase } from "../application/createFolderUseCase";
import { CreateFolderController } from "./controllers/createFolderController";

import { UpdateFolderUseCase } from "../application/updateFolderUseCase";
import { UpdateFolderController } from "./controllers/updateFolderController";

import { DeleteFolderUseCase } from "../application/deleteFolderUseCase";
import { DeleteFolderController } from "./controllers/deleteFolderController";

import { GetFolderByUserUseCase } from "../application/getFolderByUserUseCase";
import { GetFolderByUserController } from "./controllers/getFolderByUserController";

export const mysqlFolderRepostitory = new MysqlFolderRepostitory();

export const createFolderUseCase = new CreateFolderUseCase(mysqlFolderRepostitory);
export const createFolderController = new CreateFolderController(createFolderUseCase);

export const updateFolderUseCase = new UpdateFolderUseCase(mysqlFolderRepostitory);
export const updateFolderController = new UpdateFolderController(updateFolderUseCase);

export const deleteFolderUseCase = new DeleteFolderUseCase(mysqlFolderRepostitory);
export const deleteFolderController = new DeleteFolderController(deleteFolderUseCase);

export const getFolderByUserUseCase = new GetFolderByUserUseCase(mysqlFolderRepostitory);
export const getFolderByUserController = new GetFolderByUserController(getFolderByUserUseCase);

