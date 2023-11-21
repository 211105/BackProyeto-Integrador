import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";



export class MusqlActivityRepository implements IActivityRepository {
    addActivity(uuid: string, name: string, imgUrl: string): Promise<string | Error | Activity | null> {
        throw new Error("Method not implemented.");
    }
    deleteActivity(): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    updateActivity(): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    listActyvitiys(): Promise<Activity[] | null> {
        throw new Error("Method not implemented.");
    }
  
}