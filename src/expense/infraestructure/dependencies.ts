import { MysqlExpenseRepository } from "./mysqlExpenseRepository";

import { CreateExpenseUseCase } from "../application/createExpenseUseCase";
import { CreateExpenseController } from "./controllers/createExpenseController";

import { UpdataAmountExpenseUseCase } from "../application/updateAmountExpenseUseCase";
import { UpdateAmountExpenseController } from "./controllers/updateAmountExpenseController";

import { DeleteExpenseByUuidUseCase } from "../application/deleteExpenseByUuidUseCase";
import { DeleteExpenseByUuidController } from "./controllers/deleteExpenseByUuidController";

import { GetExpensesByWeeklyUseCase} from "../application/getExpensesByWeeklyUseCase";
import { GetExpensesByWeeklyController } from "./controllers/getExpensesByWeeklyController";

export const mysqlExpenseRepository = new MysqlExpenseRepository();

export const createExpenseUseCase = new CreateExpenseUseCase(mysqlExpenseRepository);
export const createExpenseController = new CreateExpenseController(createExpenseUseCase);

export const updataAmountExpenseUseCase = new UpdataAmountExpenseUseCase(mysqlExpenseRepository);
export const updateAmountExpenseController = new UpdateAmountExpenseController(updataAmountExpenseUseCase);

export const deleteExpenseByUuidUseCase = new DeleteExpenseByUuidUseCase(mysqlExpenseRepository);
export const deleteExpenseByUuidController = new DeleteExpenseByUuidController(deleteExpenseByUuidUseCase);

export const getExpensesByWeeklyUseCase = new GetExpensesByWeeklyUseCase(mysqlExpenseRepository);
export const getExpensesByWeeklyController = new GetExpensesByWeeklyController(getExpensesByWeeklyUseCase);
