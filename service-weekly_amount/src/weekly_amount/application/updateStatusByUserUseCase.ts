import { Weeklyamount } from "../domain/weekly_amount";
import { Weekly_amountRepository } from "../domain/weekly_amountRepository";
import { validate } from "class-validator";
import { ValidatorUuid } from "../domain/validations/weeklyAmount";

export class UpdateStatusByUserUseCase{
    constructor(readonly weekly_amountRepository: Weekly_amountRepository){}

    async update (user_uuid: string): Promise<Weeklyamount | null | string | Error>{

        let data = new ValidatorUuid(user_uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updateStatusByUser= await this.weekly_amountRepository.updateStatusByUser(user_uuid);
            return updateStatusByUser;
        } catch (error) {
            return null;
        }
    }
}