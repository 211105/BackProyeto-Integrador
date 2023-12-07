import { Request, Response } from "express";
import { UpdateWeeklyAmountUseCase } from "../../application/updateWeeklyAmountUseCase";
import { Weeklyamount } from "../../domain/weekly_amount";
import { verifyWeeklyAmount } from "../validations/mysqlweeklyamount";


export class UpdateWeeklyAmountController{
    constructor(readonly UpdateWeeklyAmountUseCase: UpdateWeeklyAmountUseCase){}

    async update(req: Request, res: Response){
        try {
            let {uuid,amount} = req.body;

            const verificationResult = await verifyWeeklyAmount(uuid, amount);

            if (verificationResult) {
                return res.status(409).send({
                    status: 'error',
                    message: 'La verificación del monto semanal no fue exitosa.',
                });
            }

            const updateAmount = await this.UpdateWeeklyAmountUseCase.update(uuid, amount);

            if (updateAmount) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        updateAmount
                    }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "WeeklyAmount not found."
                });
            }


        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the expense."
            });
        }
    }
}