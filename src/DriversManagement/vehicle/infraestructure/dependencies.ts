import { MysqlVehicleRepository } from "./mysqlVehicleRepository";

import { RegisterVehicleUseCase } from "../application/registerVehicleUseCase";
import { RegisterVehicleController } from "./controllers/registerVehicleController";

import { UpdateVehicleByUuidUseCase } from "../application/updateVehicleByUuidUseCase";
import { UpdateVehicleByuUuidController } from "./controllers/updateVehicleByUuidController";

import { GetVehicleByOwnerUseCase } from "../application/getVechileByOwnerUseCase";
import { GetVehicleByOwnerController } from "./controllers/getVehicleByOwnerController";

import { DeleteVehicleUseCase } from "../application/deleteVehicleUseCase";
import { DeleteVehicleController } from "./controllers/deleteVehicleController";

export const mysqlVehicleRepository = new MysqlVehicleRepository();

export const registerVehicleUseCase = new RegisterVehicleUseCase(mysqlVehicleRepository);
export const registerVehicleController = new RegisterVehicleController(registerVehicleUseCase);

export const updateVehicleByUuidUseCase = new UpdateVehicleByUuidUseCase(mysqlVehicleRepository);
export const updateVehicleByuUuidController = new UpdateVehicleByuUuidController(updateVehicleByUuidUseCase);

export const getVehicleByOwnerUseCase = new GetVehicleByOwnerUseCase(mysqlVehicleRepository);
export const getVehicleByOwnerController = new GetVehicleByOwnerController(getVehicleByOwnerUseCase);

export const deleteVehicleUseCase = new DeleteVehicleUseCase (mysqlVehicleRepository);
export const deleteVehicleController = new DeleteVehicleController(deleteVehicleUseCase);
