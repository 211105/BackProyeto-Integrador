import { IMarkRepository } from "../domain/markRepository";
import moment from 'moment-timezone';
import { v4 as uuid } from "uuid";



export class UserAsistUseCase {
    constructor(readonly markRepository: IMarkRepository) {}

    async run(
        markUuid: string,
        userUuid: string
    ): Promise<string | null> {
        const miuuid: string = uuid()
        try {
            const createMark = await this.markRepository.userAsist(
                miuuid,
                markUuid,
                userUuid
            )
            return createMark
        } catch (error) {
            return `${error}`
        }
    }
}