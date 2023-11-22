import { Driver_Vehicle } from "./driver_vehicle";

export interface Driver_VehicleRepository {
    registerDriver_Vehicle(uuid: string, driver_uuid: string, vehicle_uuid: string, status: boolean): Promise<
        | { data: Driver_Vehicle; driver?: any; vehicle?: any }
        | Error
        | null
    >;
}
