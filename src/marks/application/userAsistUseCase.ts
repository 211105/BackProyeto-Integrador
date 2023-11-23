import { IMarkRepository } from "../domain/markRepository";
import moment from 'moment-timezone';
import { v4 as uuid } from "uuid";



export class UserAsistUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        markUuid: string,
        userUuid: string, 
        latitude: number, 
        longitude: number
    ): Promise<string | null> {
        const miuuid: string = uuid()
        try {
            const createMark = await this.markRepository.userAsist(
                miuuid,
                markUuid,
                userUuid,
                latitude,
                longitude
            )
            return createMark
        } catch (error) {
            return `${error}`
        }
    }
}