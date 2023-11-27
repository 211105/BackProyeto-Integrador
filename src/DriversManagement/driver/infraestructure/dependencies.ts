import { MysqlDriverRepository } from "./mysqlDriverRepository";

import { RegisterDriverUseCase } from "../application/registerDriverUseCase";
import { RegisterDriverController} from "./controllers/registerDriverController";

import { LoginDriverUseCase } from "../application/loginDriverUseCase";
import { LoginDriverController } from "./controllers/loginDriverController";

import { UpdatePasswordUseCase } from "../application/updatePasswordUseCase";
import { UpdatePasswordController } from "./controllers/updatePasswordController";

import { ValidateIdentityUseCase } from "../application/validateIdentityUseCase";
import { ValidateIdentityController } from "./controllers/validateIdentityController";

import { UpdateDriverUseCase } from "../application/updateDriverUseCase";
import { UpdateDriverController } from "./controllers/updateDriverUseCase";

import { GetDriverByOwnerUseCase } from "../application/getDriversByOwnerUseCase";
import { GetDriverByOwnerController } from "./controllers/getDriverByOwnerController";

import { DeleteDriverUseCase } from "../application/deleteDriverUseCase";
import { DeleteDriverController } from "./controllers/deleteDriverController";

export const mysqlDriverRepository = new MysqlDriverRepository();

export const registerDriverUseCase = new RegisterDriverUseCase(mysqlDriverRepository);
export const registerDriverController = new RegisterDriverController(registerDriverUseCase);

export const loginDriverUseCase = new LoginDriverUseCase(mysqlDriverRepository);
export const loginDriverController = new LoginDriverController(loginDriverUseCase);

export const updatePasswordUseCase = new UpdatePasswordUseCase(mysqlDriverRepository);
export const updatePasswordController = new UpdatePasswordController(updatePasswordUseCase);

export const validateIdentityUseCase = new ValidateIdentityUseCase(mysqlDriverRepository);
export const validateIdentityController = new ValidateIdentityController(validateIdentityUseCase);

export const updateDriverUseCase = new UpdateDriverUseCase(mysqlDriverRepository);
export const updateDriverController = new UpdateDriverController(updateDriverUseCase);

export const getDriverByOwnerUseCase = new GetDriverByOwnerUseCase(mysqlDriverRepository);
export const getDriverByOwnerController = new GetDriverByOwnerController(getDriverByOwnerUseCase);

export const deleteDriverUseCase = new DeleteDriverUseCase(mysqlDriverRepository);
export const deleteDriverController = new DeleteDriverController(deleteDriverUseCase);