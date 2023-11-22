
import { Request, Response } from "express";
import { UserAsistUseCase } from "../../application/userAsistUseCase";

export class UserAssistController{ 
    constructor(readonly userAsistUseCase: UserAsistUseCase){}
    async  run(req: Request, res: Response) {
        try {
           
            let {
                markUuid,
                userUuid
            } = req.body

            let assistUser = await this.userAsistUseCase.run(
              markUuid,
              userUuid
            )

            return res.status(201).send({
                status: "ok",
                message: assistUser
            });

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}

