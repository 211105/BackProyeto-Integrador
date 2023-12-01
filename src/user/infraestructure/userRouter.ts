import express from "express";
import { loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";
import { Request, Response } from "express";



export const userRoutes = express.Router();
userRoutes.get('/rutine/', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

userRoutes.post('register',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.post('/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/restar_password',validateToken,updatePasswordController.run.bind(updatePasswordController))










