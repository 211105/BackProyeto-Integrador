import { IMarkRepository } from "../domain/markRepository";
import moment from 'moment-timezone';
import { v4 as uuid } from "uuid";
import { ValidatorCreateMark } from "../domain/validations/mark";
import { validate } from "class-validator";
import { Mark } from "../domain/mark";


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
    ): Promise<string | null | Mark | Error> {
        const miuuid: string = uuid()
        const numLatitude = Number(latitude);
        const numLongitude = Number(longitude);

        let data = new ValidatorCreateMark(miuuid,numLatitude,numLongitude,description,endDate,urlImage,userUuid,activityUuid);
        const validation = await validate(data);
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

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
            throw error;
        }
    }
}