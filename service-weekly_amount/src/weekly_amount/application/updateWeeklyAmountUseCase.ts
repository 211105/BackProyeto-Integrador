import { Weeklyamount } from "../domain/weekly_amount";
import { Weekly_amountRepository } from "../domain/weekly_amountRepository";
import { validate } from "class-validator";
import { ValidatorupdateAmount } from "../domain/validations/weeklyAmount";

export class UpdateWeeklyAmountUseCase{
    constructor(readonly weekly_amountRepository: Weekly_amountRepository){}

    async update (uuid: string,amount:number): Promise<Weeklyamount | null | string | Error>{

        let data = new ValidatorupdateAmount(uuid,amount);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updateAmount= await this.weekly_amountRepository.updateWeeklyAmount(uuid,amount);
            return updateAmount;
        } catch (error) {
            return null;
        }
    }
}