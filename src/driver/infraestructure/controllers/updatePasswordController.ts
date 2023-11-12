import { Request, Response } from "express";
import { UpdatePasswordUseCase } from "../../application/updatePasswordUseCase";

export class UpdatePasswordController{
    constructor(readonly updatePasswordUseCase: UpdatePasswordUseCase){}

    async update(req: Request, res: Response){
        try {
            let {uuid} = req.params;
            let{password} = req.body;

            const updateDriver = await this.updatePasswordUseCase.update(uuid, password);

            if(updateDriver){
                return res.status(200).send({
                    status: "succes",
                    data: {
                        password: updateDriver.password,
                        message:"La contraseña se a cambiado correctamente"
                        
                    }
                })
            }else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found"
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (error.message.startsWith('[')) {  // Suponiendo que los errores de validación comienzan con un corchete
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)  // Convertimos el mensaje de error en un objeto
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update password."
            });
        }
    }
}