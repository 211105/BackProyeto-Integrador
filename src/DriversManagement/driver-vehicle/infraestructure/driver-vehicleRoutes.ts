import express from "express";
import { 
    registerDriver_VehicleController,
    deleteRegisterDVController
    } from "./dependencies";

export const driver_vehicleRoutes = express.Router();

driver_vehicleRoutes.post('/',registerDriver_VehicleController.post.bind(registerDriver_VehicleController));

driver_vehicleRoutes.delete('/:uuid',deleteRegisterDVController.delete.bind(deleteRegisterDVController))
