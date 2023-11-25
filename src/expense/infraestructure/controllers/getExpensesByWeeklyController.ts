import { Request,Response } from "express";
import { GetExpensesByWeeklyUseCase } from "../../application/getExpensesByWeeklyUseCase";

export class GetExpensesByWeeklyController{
    constructor(readonly getExpensesByWeeklyUseCase: GetExpensesByWeeklyUseCase){}

    async get(req: Request, res: Response){
        try {
            let{weekly_amount_uuid} = req.params;

            const getExpensesByWeekly = await this.getExpensesByWeeklyUseCase.get(weekly_amount_uuid);

            if (getExpensesByWeekly) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        Expenses: getExpensesByWeekly
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Expenses not found "
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
                message: "An error occurred while update the Expenses."
            });
        }
    }
}