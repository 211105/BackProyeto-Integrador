import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorupdateAmount } from "../domain/validations/expense";



export class VerifyUpdateAmountUseCase{

    constructor(readonly expenseRepository:ExpenseRepository){}

    async get(uuid:string,amount:number):Promise<boolean | null | Error>{

        let data = new ValidatorupdateAmount(uuid,amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const verifyUpdateAmount = await this.expenseRepository.verifyUpdateAmount(uuid,amount);
            return verifyUpdateAmount;
        } catch (error) {
            return null;
        }
    }
}