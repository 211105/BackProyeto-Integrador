import { MarkDescription } from "../domain/mark";
import { IMarkRepository } from "../domain/markRepository";
import { ValidatorListMark } from "../domain/validations/mark";
import { validate } from "class-validator";


export class ListMarkUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        userLatitude: number, 
        userLongitude: number
    ): Promise<MarkDescription[] | null | any> {
        
        const numLatitude = Number(userLatitude);
        const numLongitude = Number(userLongitude);
        let data = new ValidatorListMark(numLatitude,numLongitude);
        const validation = await validate(data);

        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createMark = await this.markRepository.listMarks(userLatitude, userLongitude)
            return createMark
        } catch (error) {
            return `${error}`
        }
    }
}