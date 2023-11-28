import { MysqlOwnerRepository } from "./mysqlOwnerRepository";

import { RegisterOwnerUseCase } from "../application/registerOwnerUseCase";
import { RegisterOwnerController } from "./controllers/registerOwnerController";

import { UpdateOwnerUseCase } from "../application/updateOwnerUseCase";
import { UpdateOwnerController } from "./controllers/updateOwnerController";

import { DeleteOwnerUseCase } from "../application/deleteOwnerUseCase";
import { DeleteOwnerControlller } from "./controllers/deleteOwnerController";

export const mysqlOwnerRepository = new MysqlOwnerRepository();

export const registerOwnerUseCase = new RegisterOwnerUseCase(mysqlOwnerRepository);
export const registerOwnerController = new RegisterOwnerController(registerOwnerUseCase);

export const updateOwnerUseCase = new UpdateOwnerUseCase(mysqlOwnerRepository);
export const updateOwnerController = new UpdateOwnerController(updateOwnerUseCase);

export const deleteOwnerUseCase = new DeleteOwnerUseCase(mysqlOwnerRepository);
export const deleteOwnerController = new DeleteOwnerControlller(deleteOwnerUseCase);

