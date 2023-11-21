import { Activity } from "./activity";

export interface IActivityRepository {
    addActivity(
        uuid: string,
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>
    deleteActivity():Promise< string | null>
    updateActivity():Promise<string | null>
    listActyvitiys():Promise<Activity[] | null>
}