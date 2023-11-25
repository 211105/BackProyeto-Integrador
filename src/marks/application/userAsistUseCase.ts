import { IMarkRepository } from "../domain/markRepository";
import moment from 'moment-timezone';
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorUserAssist } from "../domain/validations/mark";



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
            let data = new ValidatorUserAssist(miuuid, markUuid, userUuid, latitude, longitude);
            const validation = await validate(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
                
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