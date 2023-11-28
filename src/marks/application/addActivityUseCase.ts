import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { IMarkRepository } from "../domain/markRepository";
import { Activity } from "../domain/mark";

export class AddActivityUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>{
        const miuuid: string = uuid()
       
     

        try {
            const addActivity = await this.markRepository.addActivity(miuuid,name,imgUrl)
            return addActivity;
        } catch (error) {
            return null
        }

    }
}