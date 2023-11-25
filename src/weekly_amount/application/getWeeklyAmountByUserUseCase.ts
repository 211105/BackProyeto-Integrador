import { Weeklyamount } from "../domain/weekly_amount";
import { Weekly_amountRepository } from "../domain/weekly_amountRepository";
import { validate } from "class-validator";
import { ValidatorUuid } from "../domain/validations/weeklyAmount";

export class GetWeekAmountByUserUseCase{
    constructor(readonly weekly_amountRepository: Weekly_amountRepository){}

    async get (user_uuid: string): Promise<Weeklyamount | null | string | Error>{

        let data = new ValidatorUuid(user_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getWeeklyByUser= await this.weekly_amountRepository.getWeeklyAmountByUser(user_uuid);
            return getWeeklyByUser;
        } catch (error) {
            return null;
        }
    }
}