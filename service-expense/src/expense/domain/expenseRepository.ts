import {Expense} from"./expense"

export interface ExpenseRepository{

    createExpense(uuid:string,weekly_amount_uuid:string,category:string, amount:number):Promise<Expense | null | Error | string>;
    
    updateAmountExpense(uudi:string, amount:number):Promise<Expense | null | string | Error>;

    deleteExpenseByUuid(uudi:string):Promise<Expense | null  | string | Error>;

    getExpensesByWeekly(weekly_amount_uuid:string):Promise<Expense[] | null | string | Error>

}