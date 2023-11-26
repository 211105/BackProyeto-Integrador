import express from "express";
import { loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const userRoutes = express.Router();
userRoutes.get('/rutine', (req,res) => {return res.status(200)})

userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.post('/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/restar_password',validateToken,updatePasswordController.run.bind(updatePasswordController))










