import { Driver_Vehicle,RegisterDriverVehicle } from "./driver_vehicle";

export interface Driver_VehicleRepository {
    registerDriver_Vehicle(uuid: string, driver_uuid: string, vehicle_uuid: string, status: boolean): Promise<RegisterDriverVehicle | null | string | Error>;

    deleteRegisterDV(uuid:string):Promise<RegisterDriverVehicle | null | string | Error>;
}
