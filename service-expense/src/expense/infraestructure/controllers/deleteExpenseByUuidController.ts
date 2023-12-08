import { Request, Response } from "express";
import { DeleteExpenseByUuidUseCase } from "../../application/deleteExpenseByUuidUseCase";



export class DeleteExpenseByUuidController {
    constructor(readonly deleteExpenseByUuidUseCase: DeleteExpenseByUuidUseCase) { }

    async delete(req: Request, res: Response) {
        try {

            let {uuid } = req.params;

            const deleteExpense = await this.deleteExpenseByUuidUseCase.delete(uuid);

            if (deleteExpense) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        deleteExpense
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