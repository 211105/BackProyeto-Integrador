import { MysqlOwnerRepository } from "./mysqlOwnerRepository";

import { RegisterOwnerUseCase } from "../application/registerOwnerUseCase";
import { RegisterOwnerController } from "./controllers/registerOwnerController";


export const mysqlOwnerRepository = new MysqlOwnerRepository();

export const registerOwnerUseCase = new RegisterOwnerUseCase(mysqlOwnerRepository);
export const registerOwnerController = new RegisterOwnerController(registerOwnerUseCase);