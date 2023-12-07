import { MysqlExpenseRepository } from "./mysqlExpenseRepository";

import { CreateExpenseUseCase } from "../application/createExpenseUseCase";
import { VerifyWeeklyExistUseCase } from "../application/verifyWeeklyExistUseCase";
import { VerifyWeeklyAmountUseCase } from "../application/verifyWeeklyAmountUseCase";
import { CreateExpenseController } from "./controllers/createExpenseController";

import { UpdataAmountExpenseUseCase } from "../application/updateAmountExpenseUseCase";
import { VerifyUpdateAmountUseCase } from "../application/verifyUpdateAmountUseCase";
import { UpdateAmountExpenseController } from "./controllers/updateAmountExpenseController";

import { DeleteExpenseByUuidUseCase } from "../application/deleteExpenseByUuidUseCase";
import { DeleteExpenseByUuidController } from "./controllers/deleteExpenseByUuidController";

import { GetExpensesByWeeklyUseCase} from "../application/getExpensesByWeeklyUseCase";
import { GetExpensesByWeeklyController } from "./controllers/getExpensesByWeeklyController";

export const mysqlExpenseRepository = new MysqlExpenseRepository();

export const createExpenseUseCase = new CreateExpenseUseCase(mysqlExpenseRepository);
export const verifyWeeklyExistUseCase = new VerifyWeeklyExistUseCase(mysqlExpenseRepository);
export const verifyWeeklyAmountUseCase = new VerifyWeeklyAmountUseCase(mysqlExpenseRepository);
export const createExpenseController = new CreateExpenseController(createExpenseUseCase,verifyWeeklyExistUseCase,verifyWeeklyAmountUseCase);

export const updataAmountExpenseUseCase = new UpdataAmountExpenseUseCase(mysqlExpenseRepository);
export const verifyUpdateAmountUseCase = new VerifyUpdateAmountUseCase(mysqlExpenseRepository);
export const updateAmountExpenseController = new UpdateAmountExpenseController(updataAmountExpenseUseCase,verifyUpdateAmountUseCase);

export const deleteExpenseByUuidUseCase = new DeleteExpenseByUuidUseCase(mysqlExpenseRepository);
export const deleteExpenseByUuidController = new DeleteExpenseByUuidController(deleteExpenseByUuidUseCase);

export const getExpensesByWeeklyUseCase = new GetExpensesByWeeklyUseCase(mysqlExpenseRepository);
export const getExpensesByWeeklyController = new GetExpensesByWeeklyController(getExpensesByWeeklyUseCase);
