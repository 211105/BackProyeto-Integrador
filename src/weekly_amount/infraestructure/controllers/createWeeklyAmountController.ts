import { Request, Response } from "express";
import { CreateWeeklyAmountUseCase } from "../../application/createWeeklyAmountUseCase";
import { createWeekly } from "../../domain/weekly_amount";
import { verifyWeeklyAmount } from "../validations/mysqlweeklyamount";


export class CreateWeeklyAmountController {
    constructor(readonly createWeeklyAmountUseCase: CreateWeeklyAmountUseCase) { }

    async post(req: Request, res: Response) {
        try {
            let { user_uuid, amount } = req.body;

            

            const createWeeklyAmount = await this.createWeeklyAmountUseCase.post(user_uuid, amount, amount, true);

            if (createWeeklyAmount instanceof createWeekly) {
                return res.status(201).send({
                    status: "succes",
                    data:{
                        uuid:createWeeklyAmount.uuid,
                        user_uuid:createWeeklyAmount.user_uuid,
                        amount:createWeeklyAmount.amount,
                        amount_update:createWeeklyAmount.amount_update,
                        status:createWeeklyAmount.status
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the user."
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