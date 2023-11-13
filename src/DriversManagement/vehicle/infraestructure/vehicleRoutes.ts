import express from "express";
import { 
    registerVehicleController
    } from "./dependencies";

export const vehicleRoutes = express.Router();

vehicleRoutes.post('/',registerVehicleController.post.bind(registerVehicleController))
 