import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";
import { validate } from "class-validator";
import { ValidatorUpdateActivity } from "../domain/validation/activity";

export class UpdateActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        uuid: string,
        name?: string,
        imgUrl?: string
    ):Promise<string | null>{
        let data = new ValidatorUpdateActivity(uuid,name,imgUrl);
        const validation = await validate(data);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updateActivity = await this.activityRepository.updateActivity(uuid, name, imgUrl)
            return updateActivity;
        } catch (error) {
            return null
        }

    }
}