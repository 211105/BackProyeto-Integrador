import { Request, Response } from "express";
import { ConsultationPromUseCase } from "../../application/consultationPromUseCase";
import { Bot } from "../../domain/bot";

export class ConsultationPromController {
    constructor(readonly consultationPromUseCase: ConsultationPromUseCase) {}

    async post(req: Request, res: Response) {
        try {
            const { prom } = req.body;

            const consultProm = await this.consultationPromUseCase.post(prom);

            console.log('consultProm:', consultProm);

            if (consultProm) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        consultProm
                    },
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "WeeklyAmount not found.",
                });
            }
        } catch (error) {
            console.log('Error in post:', error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while updating the bot.",
            });
        }
    }
}
