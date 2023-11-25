import { Expense } from "../domain/expense";
import { ExpenseRepository} from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorupdateAmount } from "../domain/validations/expense";

export class UpdataAmountExpenseUseCase{
    constructor( readonly expenseRepository:ExpenseRepository){}

    async update( uuid:string ,amount:number,):Promise<Expense | null | Error | string>{


        //validator-class
        let data = new ValidatorupdateAmount(uuid,amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createExpense = await this.expenseRepository.updateAmountExpense(uuid ,amount);
            return createExpense;
        } catch (error) {
            return null;
        }
    }
}