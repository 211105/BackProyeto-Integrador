import { UUIDV4 } from "@sequelize/core/types/dialects/abstract/data-types";
import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";
import { v4 as uuid } from "uuid";

export class AddActivityUseCase {
    constructor(readonly activityRepository: IActivityRepository) {}

    async run(
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>{
        const miuuid: string = uuid()

        try {
            const addActivity = await this.activityRepository.addActivity(miuuid,name,imgUrl)
            return addActivity;
        } catch (error) {
            return null
        }

    }
}