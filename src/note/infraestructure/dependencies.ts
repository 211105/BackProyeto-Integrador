import { MysqlNoteRepository } from "./mysqlNoteRepository";

import { CreateFileUseCase } from "../application/createFileUseCase";
import { CreateFileController } from "./controllers/createFileController";

import { UpdateFileNameUseCase } from "../application/updateFileNameUseCase";
import { UpdateFileNameController } from "./controllers/updateFileNameController";


export const mysqlNoteRepository = new MysqlNoteRepository();

export const createFileUseCase = new CreateFileUseCase(mysqlNoteRepository);
export const createFileController = new CreateFileController(createFileUseCase);

export const updateFileNameUseCase = new UpdateFileNameUseCase(mysqlNoteRepository);
export const updateFileNameController = new UpdateFileNameController(updateFileNameUseCase);

