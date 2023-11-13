import { Vehicle } from "./vehicle";

export interface VehicleRepository {

    registerVehicle(
        uuid:string,
        brand:string,
        model:string,
        plate_number:string,
        name_association:string,
        vin:string,
        url_img_vehicle:string,
        uuid_driver:string,
        status:boolean,
    ):Promise<Vehicle | null | string |Error>
}