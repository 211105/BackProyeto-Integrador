import { MysqlVehicleRepository } from "./mysqlVehicleRepository";

import { RegisterVehicleUseCase } from "../application/registerVehicleUseCase";
import { RegisterVehicleController } from "./controllers/registerVehicleController";


export const mysqlVehicleRepository = new MysqlVehicleRepository();

export const registerVehicleUseCase = new RegisterVehicleUseCase(mysqlVehicleRepository);
export const registerVehicleController = new RegisterVehicleController(registerVehicleUseCase);