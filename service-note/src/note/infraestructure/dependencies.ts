import { MysqlNoteRepository } from "./mysqlNoteRepository";


import { DeleteFileUseCase } from "../application/deleteFileUseCase";
import { DeleteFileController } from "./controllers/deleteFileController";

import { CreateNoteUseCase } from "../application/createNoteUseCase";
import { CreateNoteController } from "./controllers/createNoteController";

import { UpdateNoteUseCase } from "../application/updateNoteUseCase";
import { UpdateNoteController } from "./controllers/updateNoteController";

import { GetNotesByUserUseCase } from "../application/getNoteByUserUseCase";
import { GetNoteByUserController } from "./controllers/getNoteByUserController";

export const mysqlNoteRepository = new MysqlNoteRepository();

export const deleteFileUseCase = new DeleteFileUseCase(mysqlNoteRepository);
export const deleteFileController = new DeleteFileController (deleteFileUseCase);

export const createNoteUseCase = new CreateNoteUseCase(mysqlNoteRepository);
export const createNoteController = new CreateNoteController (createNoteUseCase);

export const updateNoteUseCase = new UpdateNoteUseCase(mysqlNoteRepository);
export const updateNoteController = new UpdateNoteController (updateNoteUseCase);

export const getNotesByUserUseCase = new GetNotesByUserUseCase(mysqlNoteRepository);
export const getNoteByUserController = new GetNoteByUserController(getNotesByUserUseCase);
