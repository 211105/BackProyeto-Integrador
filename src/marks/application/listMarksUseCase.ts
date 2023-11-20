import { MarkDescription } from "../domain/mark";
import { IMarkRepository } from "../domain/markRepository";


export class ListMarkUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        userLatitude: number, 
        userLongitude: number
    ): Promise<MarkDescription[] | null | string> {
        
        try {
            const createMark = await this.markRepository.listMarks(userLatitude, userLongitude)

            return createMark
        } catch (error) {
            return `${error}`
        }
    }
}