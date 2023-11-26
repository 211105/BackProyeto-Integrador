import { MysqlQuestionRepository } from "./mysqlquestionsRepository";

import { CreateQuestionUseCase } from "../application/createQuestionUseCase";
import { CreateQuestionController} from "./controllers/createQuestionController";

import { GetAllQuestionUseCase } from "../application/getAllQuestionUseCase";
import { GetAllQuestionController } from "./controllers/getAllQuestionController";

export const mysqlQuestionRepository = new MysqlQuestionRepository();

export const createQuestionUseCase = new CreateQuestionUseCase(mysqlQuestionRepository);
export const createQuestionController = new CreateQuestionController(createQuestionUseCase);

export const getAllQuestionUseCase = new GetAllQuestionUseCase(mysqlQuestionRepository);
export const getAllQuestionController = new GetAllQuestionController(getAllQuestionUseCase);