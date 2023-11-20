import { CreateMarkUseCase } from "../application/createMarkUseCase"
import { ListMarkUseCase } from "../application/listMarksUseCase"
import { CreateMarkController } from "./controllers/createMarkController"
import { ListMarkController } from "./controllers/listMarksController"
import { MysqlMarkRepository } from "./mysqlMarkRepository"


export const mysqlMarkRepository = new MysqlMarkRepository()


export const createMarkUseCase = new CreateMarkUseCase(mysqlMarkRepository)
export const createMarkController = new CreateMarkController(createMarkUseCase)

export const listMarkUseCase = new ListMarkUseCase(mysqlMarkRepository)
export const listMarkController= new ListMarkController(listMarkUseCase)


