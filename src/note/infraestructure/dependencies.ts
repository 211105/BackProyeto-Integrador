import { MysqlNoteRepository } from "./mysqlNoteRepository";

import { CreateFileUseCase } from "../application/createFileUseCase";
import { CreateFileController } from "./controllers/createFileController";

import { UpdateFileNameUseCase } from "../application/updateFileNameUseCase";
import { UpdateFileNameController } from "./controllers/updateFileNameController";

import { GetFilesByUserUseCase } from "../application/getFilesByUserUseCase";
import { GetFilesByUserController } from "./controllers/getFilesByUserController";

import { DeleteFileUseCase } from "../application/deleteFileUseCase";
import { DeleteFileController } from "./controllers/deleteFileController";

import { CreateNoteUseCase } from "../application/createNoteUseCase";
import { CreateNoteController } from "./controllers/createNoteController";

import { UpdateNoteUseCase } from "../application/updateNoteUseCase";
import { UpdateNoteController } from "./controllers/updateNoteController";

import { GetNotesByUserUseCase } from "../application/getNoteByUserUseCase";
import { GetNoteByUserController } from "./controllers/getNoteByUserController";

export const mysqlNoteRepository = new MysqlNoteRepository();

export const createFileUseCase = new CreateFileUseCase(mysqlNoteRepository);
export const createFileController = new CreateFileController(createFileUseCase);

export const updateFileNameUseCase = new UpdateFileNameUseCase(mysqlNoteRepository);
export const updateFileNameController = new UpdateFileNameController(updateFileNameUseCase);

export const getFileNameUseCase = new GetFilesByUserUseCase(mysqlNoteRepository);
export const getFilesByUserController = new GetFilesByUserController (getFileNameUseCase);

export const deleteFileUseCase = new DeleteFileUseCase(mysqlNoteRepository);
export const deleteFileController = new DeleteFileController (deleteFileUseCase);

export const createNoteUseCase = new CreateNoteUseCase(mysqlNoteRepository);
export const createNoteController = new CreateNoteController (createNoteUseCase);

export const updateNoteUseCase = new UpdateNoteUseCase(mysqlNoteRepository);
export const updateNoteController = new UpdateNoteController (updateNoteUseCase);

export const getNotesByUserUseCase = new GetNotesByUserUseCase(mysqlNoteRepository);
export const getNoteByUserController = new GetNoteByUserController(getNotesByUserUseCase);
