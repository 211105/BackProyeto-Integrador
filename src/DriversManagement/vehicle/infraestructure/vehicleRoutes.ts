import express from "express";
import { 
    registerVehicleController,
    updateVehicleByuUuidController,
    getVehicleByOwnerController,
    deleteVehicleController,
    } from "./dependencies";

export const vehicleRoutes = express.Router();

vehicleRoutes.post('/',registerVehicleController.post.bind(registerVehicleController))

vehicleRoutes.put('/',updateVehicleByuUuidController.update.bind(updateVehicleByuUuidController))

vehicleRoutes.get('/:owner_uuid',getVehicleByOwnerController.get.bind(getVehicleByOwnerController))

vehicleRoutes.delete('/:uuid',deleteVehicleController.delete.bind(deleteVehicleController))

 