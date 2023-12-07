import { createWeekly } from "../domain/weekly_amount";
import { Weekly_amountRepository } from "../domain/weekly_amountRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorCreate } from "../domain/validations/weeklyAmount";

export class CreateWeeklyAmountUseCase{
    constructor(readonly weekly_amountRepository:Weekly_amountRepository){}


    async post(user_uuid:string,amount:number,amount_update:number,status:boolean):Promise<createWeekly | null | string | Error>{
        
        const miuuid: string = uuid()

        //validator-class
        let data = new ValidatorCreate(miuuid, user_uuid, amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createWeeklyAmount = await this.weekly_amountRepository.createWeeklyAmount(miuuid,user_uuid,amount,amount_update,status);
            return createWeeklyAmount;
        } catch (error) {
            return null;
        }
    }
}