import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorUuid } from "../domain/validations/expense";



export class GetExpensesByWeeklyUseCase{
    constructor(readonly expenseRepository: ExpenseRepository){}

    async get(weekly_amount_uuid:string):Promise<Expense[] | null | Error | string>{

        let data = new ValidatorUuid(weekly_amount_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getExpensesByWeekly = await this.expenseRepository.getExpensesByWeekly(weekly_amount_uuid);
            return getExpensesByWeekly;
        } catch (error) {
            return null;
        }
    }
}