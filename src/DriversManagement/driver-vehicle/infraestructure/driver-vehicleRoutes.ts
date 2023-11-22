import express from "express";
import { 
    registerDriver_VehicleController
    } from "./dependencies";

export const driver_vehicleRoutes = express.Router();

driver_vehicleRoutes.post('/',registerDriver_VehicleController.post.bind(registerDriver_VehicleController))
