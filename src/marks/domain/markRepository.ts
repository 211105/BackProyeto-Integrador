import { MarkDescription, UserAsist, UserOwner } from "./mark";


export interface IMarkRepository {
    createMark(
        uuid: string,
        latitude: number,
        longitude: number,
        description: string,
        endDate: string,
        urlImage: string,
        userUuid: string,
        activityUuid: string,
    ): Promise <string | null>

    listMarks(userLatitude: number, userLongitude: number): Promise <MarkDescription[] | null | string>; 

    userAsist(uuid: string, markUuid: string, userUuid: string ):Promise<string | null>;
}