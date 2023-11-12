import express from "express";
import { 
    registerDriverController,
    loginDriverController} from "./dependencies";

export const driverRoutes = express.Router();

driverRoutes.post('/',registerDriverController.post.bind(registerDriverController))

driverRoutes.post('/login',loginDriverController.login.bind(loginDriverController)) 