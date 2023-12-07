import { Request, Response } from "express";
import { UpdateStatusByUserUseCase } from "../../application/updateStatusByUserUseCase";
import { Weeklyamount } from "../../domain/weekly_amount";

export class UpdateStatusByUserController{
    constructor(readonly updateStatusByUserUseCase: UpdateStatusByUserUseCase){}

    async update(req: Request, res: Response){
        try {
            let {user_uuid} = req.params;

            const updateStatusByUser = await this.updateStatusByUserUseCase.update(user_uuid);

            if (updateStatusByUser) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        updateStatusByUser
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
                message: "An error occurred while update the WeeklyAmount."
            });
        }
    }
}