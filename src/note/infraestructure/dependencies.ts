import { MysqlNoteRepository } from "./mysqlNoteRepository";

import { CreateFileUseCase } from "../application/createFileUseCase";
import { CreateFileController } from "./controllers/createFileController";

import { UpdateFileNameUseCase } from "../application/updateFileNameUseCase";
import { UpdateFileNameController } from "./controllers/updateFileNameController";

import { GetFilesByUserUseCase } from "../application/getFilesByUserUseCase";
import { GetFilesByUserController } from "./controllers/getFilesByUserController";

import { DeleteFileUseCase } from "../application/deleteFileUseCase";
import { DeleteFileController } from "./controllers/deleteFileController";


export const mysqlNoteRepository = new MysqlNoteRepository();

export const createFileUseCase = new CreateFileUseCase(mysqlNoteRepository);
export const createFileController = new CreateFileController(createFileUseCase);

export const updateFileNameUseCase = new UpdateFileNameUseCase(mysqlNoteRepository);
export const updateFileNameController = new UpdateFileNameController(updateFileNameUseCase);

export const getFileNameUseCase = new GetFilesByUserUseCase(mysqlNoteRepository);
export const getFilesByUserController = new GetFilesByUserController (getFileNameUseCase);

export const deleteFileUseCase = new DeleteFileUseCase(mysqlNoteRepository);
export const deleteFileController = new DeleteFileController (deleteFileUseCase);
