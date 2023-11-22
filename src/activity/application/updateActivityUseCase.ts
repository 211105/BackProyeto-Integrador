import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";

export class UpdateActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        uuid: string,
        name?: string,
        imgUrl?: string
    ):Promise<string | null>{

        try {
            const updateActivity = await this.activityRepository.updateActivity(uuid, name, imgUrl)
            return updateActivity;
        } catch (error) {
            return null
        }

    }
}