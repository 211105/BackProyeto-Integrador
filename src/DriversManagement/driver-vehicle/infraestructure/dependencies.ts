import { MysqlDriver_VehicleRepository } from "./mysqlDriver-VehicleRepostitory";

import { RegisterDriver_VehicleUseCase } from "../application/registerDriver_VehicleUseCase";
import { RegisterDriver_VehicleController } from "./controllers/registerDriver_VehicleController";

import { DeleteRegisterDVUseCase } from "../application/deleteRegisterDVUseCase";
import { DeleteRegisterDVController } from "./controllers/deleteRegisterDVController";

export const mysqlDriver_VehicleRepository = new MysqlDriver_VehicleRepository();

export const registerDriver_VehicleUseCase = new RegisterDriver_VehicleUseCase(mysqlDriver_VehicleRepository);
export const registerDriver_VehicleController = new RegisterDriver_VehicleController (registerDriver_VehicleUseCase);

export const deleteRegisterDVUseCase = new DeleteRegisterDVUseCase(mysqlDriver_VehicleRepository);
export const deleteRegisterDVController = new DeleteRegisterDVController(deleteRegisterDVUseCase)