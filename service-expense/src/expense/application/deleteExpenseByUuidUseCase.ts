import { Expense } from "../domain/expense";
import { ExpenseRepository} from "../domain/expenseRepository";
import { validate } from "class-validator";
import { ValidatorUuid } from "../domain/validations/expense";

export class DeleteExpenseByUuidUseCase{
    constructor( readonly expenseRepository:ExpenseRepository){}

    async delete( uuid:string):Promise<Expense | null | Error | string>{

        //validator-class
        let data = new ValidatorUuid(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const deleteExpense = await this.expenseRepository.deleteExpenseByUuid(uuid);
            return deleteExpense;
        } catch (error) {
            return null;
        }
    }
}