import express from "express";
import { 
    registerDriver_VehicleController,
    deleteRegisterDVUseCase
    } from "./dependencies";

export const driver_vehicleRoutes = express.Router();

driver_vehicleRoutes.post('/',registerDriver_VehicleController.post.bind(registerDriver_VehicleController));

driver_vehicleRoutes.delete('/:uuid',deleteRegisterDVUseCase.delete.bind(deleteRegisterDVUseCase))
