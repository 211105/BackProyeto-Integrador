import { Activity } from "../domain/mark";
import { IMarkRepository } from "../domain/markRepository";



export class ListActivitysUseCase {
    constructor(readonly markRepository: IMarkRepository) {}
    
    async run(
    ): Promise<Activity[] | null> {
    

        try {
            const list = await this.markRepository.listActyvitiys()
            return list;
        } catch (error) {
            return null;
        }
    }
}