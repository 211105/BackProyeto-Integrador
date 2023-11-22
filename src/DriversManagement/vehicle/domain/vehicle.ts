export class Vehicle{
    constructor(
        public uuid:string,
        public brand:string,
        public model:string,
        public plate_number:string,
        public name_association:string,
        public vin:string,
        public url_img:string,
        public owner_uuid:string,
        public status:boolean,
        public status_driver_selection:boolean,
    ){}
}