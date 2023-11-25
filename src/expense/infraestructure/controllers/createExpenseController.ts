import { Request, Response } from "express";
import { CreateExpenseUseCase } from "../../application/createExpenseUseCase";
import { Expense } from "../../domain/expense";
import { isWeeklyAmountUuidRegistered,isAmountUpdateValid } from "../validations/mysqlexpense";

export class CreateExpenseController {
    constructor(readonly createExpenseUseCase: CreateExpenseUseCase) { }

    async post(req: Request, res: Response) {
        try {
            let { weekly_amount_uuid, category, amount } = req.body;

            //Verifica si el UUID de  weekly existe
            const weeklyAmountUuidRegistered = await isWeeklyAmountUuidRegistered(weekly_amount_uuid);
            if (!weeklyAmountUuidRegistered) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El weekly_amount_uuid no existe.',
                });
            }

            const isUpdateValid = await isAmountUpdateValid(weekly_amount_uuid, amount);
            if (!isUpdateValid) {
                return res.status(400).send({
                    status: 'error',
                    message: 'La cantidad que ingresaste, rebasa a la cantiad de gasto semanal o esta en 0 la cantidad semanal',
                });
            }

            const createExpense = await this.createExpenseUseCase.post(weekly_amount_uuid, category, amount);

            if (createExpense instanceof Expense) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        uudi: createExpense.uuid,
                        weekly_amount_uuid: createExpense.weekly_amount_uuid,
                        category: createExpense.category,
                        amount: createExpense.amount,
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the expense."
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