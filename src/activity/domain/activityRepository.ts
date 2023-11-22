import { Activity } from "./activity";

export interface IActivityRepository {
    addActivity(
        uuid: string,
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>
    deleteActivity(
        uuid: string
        ):Promise< string | null>
    updateActivity(
        uuid: string,
        name?: string,
        imgUrl?: string
    ):Promise<string | null>
    listActyvitiys():Promise<Activity[] | null>
}