import express from "express";
import { loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController,getUserByUuidController, getUserOwnersControllers,updateImgUrlController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";
import { Request, Response } from "express";



export const userRoutes = express.Router();
userRoutes.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

userRoutes.post('/auth/register',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.post('/auth/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/restar_password',validateToken,updatePasswordController.run.bind(updatePasswordController))

userRoutes.put('/restar_password',validateToken,updatePasswordController.run.bind(updatePasswordController))

userRoutes.post("/owners/",validateToken, getUserOwnersControllers.get.bind(getUserOwnersControllers))

userRoutes.get('/:uuid',validateToken,getUserByUuidController.get.bind(getUserByUuidController))

userRoutes.put('/update/img',validateToken,updateImgUrlController.run.bind(updateImgUrlController))
  












