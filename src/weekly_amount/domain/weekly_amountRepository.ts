import { Weeklyamount } from "./weekly_amount"


export interface Weekly_amountRepository{

    createWeeklyAmount(uuid:string,user_uuid:string,amount:number,amount_update:number,status:boolean ):Promise<Weeklyamount | null | string | Error>

    getWeeklyAmountByUser(user_uuid:string,):Promise<Weeklyamount | null  | string | Error>;

    updateStatusByUser(user_uuid:string):Promise<Weeklyamount | null | string | Error>

    updateWeeklyAmount(uuid:string, amount:number):Promise<Weeklyamount | null | string | Error>
}