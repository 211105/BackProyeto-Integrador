import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorupdateAmount } from "../domain/validations/expense";



export class VerifyWeeklyAmountUseCase{

    constructor(readonly expenseRepository:ExpenseRepository){}

    async get(weekly_amount_uuid:string,amount:number):Promise<boolean | null | Error>{

        let data = new ValidatorupdateAmount(weekly_amount_uuid,amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const verifyWeeklyAmount = await this.expenseRepository.verifyWeeklyAmount(weekly_amount_uuid,amount);
            return verifyWeeklyAmount;
        } catch (error) {
            return null;
        }
    }
}