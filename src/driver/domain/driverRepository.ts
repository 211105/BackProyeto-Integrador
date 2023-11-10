import { Driver} from "./driver";

export interface DriverRepository{
    
    registerDriver(
        uuid:string,
        name:string,
        surname:string,
        second_surname:string,
        email:string,
        password:string,
        url_photography:string,
        identification_number: string,
        url_identification:string,
        phone:string,
        status:boolean
        ):Promise<Driver | null | Error>
}