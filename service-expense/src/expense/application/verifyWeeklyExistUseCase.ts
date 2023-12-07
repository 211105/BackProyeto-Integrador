import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorUuid } from "../domain/validations/expense";


export class VerifyWeeklyExistUseCase{

    constructor(readonly expenseRepository:ExpenseRepository){}

    async get(weekly_amount_uuid:string):Promise<boolean | null | Error>{

        let data = new ValidatorUuid(weekly_amount_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const verifyWeekly = await this.expenseRepository.verifyWeeklyExist(weekly_amount_uuid);
            return verifyWeekly;
        } catch (error) {
            return null;
        }
    }
}