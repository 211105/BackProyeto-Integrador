import { MysqlDriverRepository } from "./mysqlDriverRepository";

import { RegisterDriverUseCase } from "../application/registerDriverUseCase";
import { RegisterDriverController} from "./controllers/registerDriverController";

import { LoginDriverUseCase } from "../application/loginDriverUseCase";
import { LoginDriverController } from "./controllers/loginDriverController";

import { UpdatePasswordUseCase } from "../application/updatePasswordUseCase";
import { UpdatePasswordController } from "./controllers/updatePasswordController";

export const mysqlDriverRepository = new MysqlDriverRepository();

export const registerDriverUseCase = new RegisterDriverUseCase(mysqlDriverRepository);
export const registerDriverController = new RegisterDriverController(registerDriverUseCase);

export const loginDriverUseCase = new LoginDriverUseCase(mysqlDriverRepository);
export const loginDriverController = new LoginDriverController(loginDriverUseCase);

export const updateDriverUseCase = new UpdatePasswordUseCase(mysqlDriverRepository);
export const updateDriverController = new UpdatePasswordController(updateDriverUseCase);