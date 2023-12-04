
import { Request, Response } from "express";
import { UserAsistUseCase } from "../../application/userAsistUseCase";

const FUERA_RANGO = "Usuario fuera de rango.";
const ASISTENCIA_DUPLICADA = "El usuario ya ha asistido.";

export class UserAssistController{ 
    constructor(readonly userAsistUseCase: UserAsistUseCase){}
    async  run(req: Request, res: Response) {
        try {
           
            let {
                markUuid,
                userUuid,
                latitude,
                longitude
            } = req.body
            let assistUser = await this.userAsistUseCase.run(
                markUuid,
                userUuid,
                latitude,
                longitude
            )

            if (assistUser == "exitoso") {
                return res.status(201).send({
                    status: "ok",
                    message: assistUser
                });
            } else if (assistUser == FUERA_RANGO) {
                return res.status(400).send({
                    status: "error-fuera-de-rango",
                    message: assistUser
                });
            } else if (assistUser == ASISTENCIA_DUPLICADA) {
                return res.status(400).send({
                    status: "error-ya-asistio",
                    message: assistUser
                });
            }
        } catch (error) {
            
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {      
                    const errors = JSON.parse(error.message);
                    const modifiedErrors = errors.map(({ property, children, constraints }) => ({
                        property,
                        children,
                        constraints
                    }));
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: modifiedErrors
                    });
                }
            }

            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}

