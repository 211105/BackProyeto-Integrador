import { MysqlWeeklyAmountRepository } from "./mysqlWeeklyAmountRespository";

import { CreateWeeklyAmountUseCase } from "../application/createWeeklyAmountUseCase";
import { CreateWeeklyAmountController } from "./controllers/createWeeklyAmountController";

import { GetWeekAmountByUserUseCase } from "../application/getWeeklyAmountByUserUseCase";
import { GetWeeklyAmountByUserController } from "./controllers/getWeeklyAmountByUserController";

import { UpdateStatusByUserUseCase } from "../application/updateStatusByUserUseCase";
import { UpdateStatusByUserController } from "./controllers/updateStatusByUserController";

import { UpdateWeeklyAmountUseCase } from "../application/updateWeeklyAmountUseCase";
import { VerifyWeeklyAmountUseCase } from "../application/veriFyWeeklyAmountUseCase";
import { UpdateWeeklyAmountController } from "./controllers/updateWeeklyAmountController";

export const mysqlWeeklyAmountRepository = new MysqlWeeklyAmountRepository();

export const createWeeklyAmountUseCase = new CreateWeeklyAmountUseCase(mysqlWeeklyAmountRepository);
export const createWeeklyAmountController = new CreateWeeklyAmountController(createWeeklyAmountUseCase);

export const getWeekAmountByUserUseCase = new GetWeekAmountByUserUseCase(mysqlWeeklyAmountRepository);
export const getWeeklyAmountByUserController = new GetWeeklyAmountByUserController(getWeekAmountByUserUseCase);

export const updateStatusByUserUseCase = new UpdateStatusByUserUseCase(mysqlWeeklyAmountRepository);
export const updateStatusByUserController = new UpdateStatusByUserController(updateStatusByUserUseCase)

export const updateWeeklyAmountUseCase = new UpdateWeeklyAmountUseCase(mysqlWeeklyAmountRepository);
export const verifyWeeklyAmountUseCase = new VerifyWeeklyAmountUseCase(mysqlWeeklyAmountRepository);
export const updateWeeklyAmountController = new UpdateWeeklyAmountController(updateWeeklyAmountUseCase,verifyWeeklyAmountUseCase);