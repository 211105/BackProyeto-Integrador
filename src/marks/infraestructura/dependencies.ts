import { AddActivityUseCase } from "../application/addActivityUseCase"
import { AddOwnerMarksUseCase } from "../application/addOwnerMarksUseCase"
import { CreateMarkUseCase } from "../application/createMarkUseCase"
import { ListActivitysUseCase } from "../application/listActyvitiysUseCase"
import { ListMarkUseCase } from "../application/listMarksUseCase"
import { UserAsistUseCase } from "../application/userAsistUseCase"
import { AddActivityController } from "./controllers/addActivityController"
import { CreateMarkController } from "./controllers/createMarkController"
import { ListActivitysController } from "./controllers/listActivitysController"
import { ListMarkController } from "./controllers/listMarksController"
import { UserAssistController } from "./controllers/userAsistController"
import { MysqlMarkRepository } from "./mysqlMarkRepository"


export const mysqlMarkRepository = new MysqlMarkRepository()


export const createMarkUseCase = new CreateMarkUseCase(mysqlMarkRepository)
export const createMarkController = new CreateMarkController(createMarkUseCase)

export const listMarkUseCase = new ListMarkUseCase(mysqlMarkRepository)
export const addOwnerMarksUseCase = new AddOwnerMarksUseCase(mysqlMarkRepository)
export const listMarkController= new ListMarkController(listMarkUseCase,addOwnerMarksUseCase)

export const userAssistUseCase = new UserAsistUseCase(mysqlMarkRepository);
export const userAssistController = new UserAssistController(userAssistUseCase)

export const listActivitysUseCase = new ListActivitysUseCase(mysqlMarkRepository)
export const listActivitysController = new ListActivitysController(listActivitysUseCase)

export const addActivityUseCase = new AddActivityUseCase(mysqlMarkRepository)
export const adActivityController = new AddActivityController(addActivityUseCase)