import { Expense } from "../domain/expense";
import { ExpenseRepository } from "../domain/expenseRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorCreate } from "../domain/validations/expense";



export class CreateExpenseUseCase{
    constructor( readonly expenseRepository:ExpenseRepository){}

    async post( weekly_amount_uuid:string,category:string ,amount:number,):Promise<Expense | null | Error | string>{

        const miuuid: string = uuid()

        //validator-class
        let data = new ValidatorCreate(miuuid, weekly_amount_uuid, category, amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createExpense = await this.expenseRepository.createExpense(miuuid, weekly_amount_uuid, category, amount);
            return createExpense;
        } catch (error) {
            return null;
        }
    }
}