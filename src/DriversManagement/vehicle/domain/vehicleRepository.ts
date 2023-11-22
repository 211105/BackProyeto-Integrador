import { Vehicle } from "./vehicle";

export interface VehicleRepository {

    registerVehicle(
        uuid:string,
        brand:string,
        model:string,
        plate_number:string,
        name_association:string,
        vin:string,
        url_img:string,
        owner_uuid:string,
        status:boolean,
        status_driver_selection:boolean,
    ):Promise<Vehicle | null | string |Error>

    updateVehicleByUuid(
        uuid:string,
        brand?:string,
        model?:string,
        plate_number?:string,
        name_association?:string,
        vin?:string,
        url_img?:string
    ):Promise<Vehicle | null | string | Error>

    getVehicleByOwner(owner_uuid:string):Promise<Vehicle[] | null | string | Error>;

    deleteVehicle(uuid:string):Promise<Vehicle | null | string | Error>;
}