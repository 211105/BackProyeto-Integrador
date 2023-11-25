import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorAddActivity } from "../domain/validation/activity";

export class AddActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>{
        const miuuid: string = uuid()
        let data = new ValidatorAddActivity(miuuid,name,imgUrl);
        const validation = await validate(data);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const addActivity = await this.activityRepository.addActivity(miuuid,name,imgUrl)
            return addActivity;
        } catch (error) {
            return null
        }

    }
}