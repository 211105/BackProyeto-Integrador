import { v4 as uuid } from "uuid";
import { IMarkRepository } from "../domain/markRepository";
import { Activity, MarkDescription, UserOwner } from "../domain/mark";

export class AddOwnerMarksUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        marks: any[],
         owners: UserOwner[],
    ):Promise<Activity | null | string | Error>{
       
     

        try {
            const addActivity = await this.markRepository.addOwnerMarks(marks, owners)
            return addActivity;
        } catch (error) {
            return null
        }

    }
}