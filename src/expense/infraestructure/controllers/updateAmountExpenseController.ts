import { Request, Response } from "express";
import { UpdataAmountExpenseUseCase } from "../../application/updateAmountExpenseUseCase";
import { VerifyUpdateAmountUseCase } from "../../application/verifyUpdateAmountUseCase";

export class UpdateAmountExpenseController {
    constructor(readonly updataAmountExpenseUseCase: UpdataAmountExpenseUseCase, readonly verifyUpdateAmountUseCase:VerifyUpdateAmountUseCase) { }

    async update(req: Request, res: Response) {
        try {

            let { uuid, amount } = req.body;

            const verifyAmount = await this.verifyUpdateAmountUseCase.get(uuid, amount);

            if (!verifyAmount) {
                return res.status(400).send({
                    status: 'error',
                    message: 'La actualización del amount no es válida. Revasa a la cantiada semanal disponibleee',
                });
            }

            const updateAmount = await this.updataAmountExpenseUseCase.update(uuid, amount);

            if (updateAmount) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        updateAmount
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the Expense."
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