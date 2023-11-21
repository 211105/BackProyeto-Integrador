import express from "express";
import { 
    registerDriverController,
    loginDriverController,
    updatePasswordController,
    validateIdentityController,
    updateDriverController,
    getDriverByOwnerController,
    deleteDriverController,
    } from "./dependencies";

export const driverRoutes = express.Router();

driverRoutes.post('/',registerDriverController.post.bind(registerDriverController))

driverRoutes.post('/login',loginDriverController.login.bind(loginDriverController))

driverRoutes.put('/update_password/:uuid',updatePasswordController.update.bind(updatePasswordController));

driverRoutes.put('/validate/identity/:uuid',validateIdentityController.update.bind(validateIdentityController));

driverRoutes.put('/',updateDriverController.update.bind(updateDriverController));

driverRoutes.get('/:owner_uuid',getDriverByOwnerController.get.bind(getDriverByOwnerController));

driverRoutes.delete('/:uuid',deleteDriverController.delete.bind(deleteDriverController));



