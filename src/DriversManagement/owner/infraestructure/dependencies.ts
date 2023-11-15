import { MysqlOwnerRepository } from "./mysqlOwnerRepository";

import { RegisterOwnerUseCase } from "../application/registerOwnerUseCase";
import { RegisterOwnerController } from "./controllers/registerOwnerController";

import { UpdateOwnerUseCase } from "../application/updateOwnerUseCase";
import { UpdateOwnerController } from "./controllers/updateOwnerController";

export const mysqlOwnerRepository = new MysqlOwnerRepository();

export const registerOwnerUseCase = new RegisterOwnerUseCase(mysqlOwnerRepository);
export const registerOwnerController = new RegisterOwnerController(registerOwnerUseCase);

export const updateOwnerUseCase = new UpdateOwnerUseCase(mysqlOwnerRepository);
export const updateOwnerController = new UpdateOwnerController(updateOwnerUseCase);

