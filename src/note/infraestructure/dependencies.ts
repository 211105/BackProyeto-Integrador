import { MysqlNoteRepository } from "./mysqlNoteRepository";

import { CreateFileUseCase } from "../application/createFileUseCase";
import { CreateFileController } from "./controllers/createFileController";



export const mysqlNoteRepository = new MysqlNoteRepository();

export const createFileUseCase = new CreateFileUseCase(mysqlNoteRepository);
export const createFileController = new CreateFileController(createFileUseCase);

