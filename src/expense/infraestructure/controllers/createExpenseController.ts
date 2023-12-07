import { Request, Response } from "express";
import { CreateExpenseUseCase } from "../../application/createExpenseUseCase";
import { VerifyWeeklyExistUseCase } from "../../application/verifyWeeklyExistUseCase";
import { VerifyWeeklyAmountUseCase } from "../../application/verifyWeeklyAmountUseCase";
import { Expense } from "../../domain/expense";

export class CreateExpenseController {
    constructor(
        readonly createExpenseUseCase: CreateExpenseUseCase, 
        readonly verifyWeeklyExistUseCase:VerifyWeeklyExistUseCase,
        readonly verifyWeeklyAmountUseCase:VerifyWeeklyAmountUseCase
    ){}

    async post(req: Request, res: Response) {
        try {
            let { weekly_amount_uuid, category, amount } = req.body;

            //Verifica si el uuid del weekly_amount existe en la base de datos
            const verifyWeekly = await this.verifyWeeklyExistUseCase.get(weekly_amount_uuid);
            if (!verifyWeekly) {
                return res.status(409).send({
                    status: 'error',
                    message: 'El weekly_amount_uuid no existe dentro de la base de datos.',
                });
            }

           // verifica que la categoria a agregar no rebase a la cantidad semanal
            const VerifyWeeklyAmountUseCase = await this.verifyWeeklyAmountUseCase.get(weekly_amount_uuid,amount);
            if (!VerifyWeeklyAmountUseCase) {
                return res.status(400).send({
                    status: 'error',
                    message: 'La cantidad que ingresaste, rebasa a la cantiad de gasto semanal o esta en 0 :c',
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