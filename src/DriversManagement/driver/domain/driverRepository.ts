import { Driver} from "./driver";
import { ResonseLogin } from "../../driver/domain/driver";

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
        status:boolean,
        status_identity:boolean,
        status_moto_selection:boolean,
        owner_uuid:string,
        type_user:string

    ):Promise<Driver | null | Error>

    validateIdentity(uuid:string,url_identification:string):Promise<Driver | null | string | Error>

    loginDriver(email:string, password:string):Promise<ResonseLogin | null | string>

    updatePassword(uuid:string, password:string):Promise<Driver | null>;
    
    updateDriver(uuid:string, email?:string, url_photography?:string, phone?:string):Promise<Driver | null | Error | string>
}