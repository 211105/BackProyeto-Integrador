import express from "express";
import { 
    registerDriverController,
    loginDriverController,
    updateDriverController} from "./dependencies";

export const driverRoutes = express.Router();

driverRoutes.post('/',registerDriverController.post.bind(registerDriverController))

driverRoutes.post('/login',loginDriverController.login.bind(loginDriverController))

driverRoutes.put('/update_password/:uuid',updateDriverController.update.bind(updateDriverController)) 