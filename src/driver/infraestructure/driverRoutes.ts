import express from "express";
import { registerDriverController } from "./dependencies";

export const driverRoutes = express.Router();

driverRoutes.post('/',registerDriverController.post.bind(registerDriverController)) 