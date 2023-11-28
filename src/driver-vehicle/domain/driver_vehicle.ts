export class Driver_Vehicle {
    constructor(
        public uuid: string,
        public driver_uuid:string,
        public vehicle_uuid:string,
        public status:boolean
    ){}
}

export class RegisterDriverVehicle{
    constructor(
        public uuid: string,
        public driver_uuid:string,
        public vehicle_uuid:string,
        public status:boolean,
        public dataDriver:[],
        public dataVehicle:[]
    ){}
}