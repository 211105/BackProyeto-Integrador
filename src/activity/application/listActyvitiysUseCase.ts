import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";



export class ListActivitysUseCase {
    constructor(readonly ActivityRepository: IActivityRepository) {}
    
    async run(
    ): Promise<Activity[] | null> {
    

        try {
            const list = await this.ActivityRepository.listActyvitiys()
            return list;
        } catch (error) {
            return null;
        }
    }
}