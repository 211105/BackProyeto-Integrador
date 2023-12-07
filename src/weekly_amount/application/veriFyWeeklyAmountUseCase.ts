import { Weeklyamount } from "../domain/weekly_amount";
import { Weekly_amountRepository} from "../domain/weekly_amountRepository";
import { validate } from "class-validator";
import { ValidatorupdateAmount } from "../domain/validations/weeklyAmount";

export class VerifyWeeklyAmountUseCase{

    constructor(readonly weekly_amountRepository:Weekly_amountRepository){}

    async get(uuid:string,amount:number):Promise<Weeklyamount | null | string | Error | boolean>{

        let data = new ValidatorupdateAmount(uuid,amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getVerifyAmount = await this.weekly_amountRepository.verifyWeeklyAmount(uuid, amount);
            return getVerifyAmount;
        } catch (error) {
            return null;
        }
    }
    
}