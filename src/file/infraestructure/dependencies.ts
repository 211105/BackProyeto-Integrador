import { MysqlFileRepository } from "./mysqlFileRepository";

import { CreateFileUseCase } from "../application/createFileUseCase";
import { CreateFileController} from "./controllers/createFileController";

import { UpdateFileUseCase } from "../application/updateFileUseCase";
import { UpdateFileController } from "./controllers/updateFileController";

import { GetFilesByFolderUseCase } from "../application/getFilesByFolderUseCase";
import { GetFilesByFolderController } from "./controllers/getFilesByFolderController";

import { DeleteFileUseCase } from "../application/deleteFileUseCase";
import { DeleteFileController } from "./controllers/deleteFolderController";

export const mysqlFileRepository = new MysqlFileRepository();

export const createFileUseCase = new CreateFileUseCase(mysqlFileRepository);
export const createFileController = new CreateFileController(createFileUseCase);

export const updateFileUseCase = new UpdateFileUseCase(mysqlFileRepository);
export const updateFileController = new UpdateFileController(updateFileUseCase);

export const getFilesByFolderUseCase = new GetFilesByFolderUseCase(mysqlFileRepository);
export const getFilesByFolderController = new GetFilesByFolderController(getFilesByFolderUseCase);

export const deleteFileUseCase = new DeleteFileUseCase(mysqlFileRepository);
export const deleteFileController = new DeleteFileController(deleteFileUseCase);

