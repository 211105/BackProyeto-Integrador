import { Request, Response } from "express";
import { GetWeekAmountByUserUseCase } from "../../application/getWeeklyAmountByUserUseCase";
import { Weeklyamount } from "../../domain/weekly_amount";

export class GetWeeklyAmountByUserController{
    constructor(readonly getWeekAmountByUserUseCase: GetWeekAmountByUserUseCase){}

    async get(req: Request, res: Response){
        try {
            let {user_uuid} = req.params;

            const getWeeklyByUser = await this.getWeekAmountByUserUseCase.get(user_uuid);

            if (getWeeklyByUser) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        getWeeklyByUser
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
                message: "An error occurred while update the weekly amount."
            });
        }
    }
}