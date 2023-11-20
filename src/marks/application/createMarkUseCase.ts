import { IMarkRepository } from "../domain/markRepository";
import moment from 'moment-timezone';
import { v4 as uuid } from "uuid";



export class CreateMarkUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        latitude: number,
        longitude: number,      
        description: string,
        urlImage: string,
        endDate: string,
        userUuid: string,
        activityUuid: string,
    ): Promise<string | null> {
        const miuuid: string = uuid()
        try {
            const createMark = await this.markRepository.createMark(
                miuuid,
                latitude,
                longitude,
                description,
                endDate,
                urlImage,
                userUuid,
                activityUuid
            )
            return createMark
        } catch (error) {
            return `${error}`
        }
    }
}