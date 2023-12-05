import { Activity, MarkDescription, UserAsist, UserOwner } from "./mark";


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

    listMarks(userLatitude: number, userLongitude: number): Promise <MarkDescription[] | null | any>; 

    userAsist(uuid: string, markUuid: string, userUuid: string, latitude: number, longitude: number):Promise<string | null | Error>;

    addActivity(
        uuid: string,
        name: string,
        imgUrl: string
    ):Promise<Activity | null | string | Error>

    listActyvitiys():Promise<Activity[] | null>

}
