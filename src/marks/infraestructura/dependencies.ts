import { CreateMarkUseCase } from "../application/createMarkUseCase"
import { ListMarkUseCase } from "../application/listMarksUseCase"
import { UserAsistUseCase } from "../application/userAsistUseCase"
import { CreateMarkController } from "./controllers/createMarkController"
import { ListMarkController } from "./controllers/listMarksController"
import { UserAssistController } from "./controllers/userAsistController"
import { MysqlMarkRepository } from "./mysqlMarkRepository"


export const mysqlMarkRepository = new MysqlMarkRepository()


export const createMarkUseCase = new CreateMarkUseCase(mysqlMarkRepository)
export const createMarkController = new CreateMarkController(createMarkUseCase)

export const listMarkUseCase = new ListMarkUseCase(mysqlMarkRepository)
export const listMarkController= new ListMarkController(listMarkUseCase)

export const userAssistUseCase = new UserAsistUseCase(mysqlMarkRepository);
export const userAssistController = new UserAssistController(userAssistUseCase)


