import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";
import { validate } from "class-validator";
import { ValidatorDeleteActivity } from "../domain/validation/activity";


export class DeleteActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        uuid:string
    ):Promise<Activity | null | string | Error>{
        let data = new ValidatorDeleteActivity(uuid);
        const validation = await validate(data);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteActivity = await this.activityRepository.deleteActivity(uuid)
            return deleteActivity;
        } catch (error) {
            return null
        }

    }
}