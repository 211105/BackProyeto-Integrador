import { MysqlDriverRepository } from "./mysqlDriverRepository";

import { RegisterDriverUseCase } from "../application/registerDriverUseCase";
import { RegisterDriverController} from "./controllers/registerDriverController";

export const mysqlDriverRepository = new MysqlDriverRepository();

export const registerDriverUseCase = new RegisterDriverUseCase(mysqlDriverRepository);
export const registerDriverController = new RegisterDriverController(registerDriverUseCase);