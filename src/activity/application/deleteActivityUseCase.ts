import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";

export class DeleteActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        uuid:string
    ):Promise<Activity | null | string | Error>{
        try {
            const deleteActivity = await this.activityRepository.deleteActivity(uuid)
            return deleteActivity;
        } catch (error) {
            return null
        }

    }
}