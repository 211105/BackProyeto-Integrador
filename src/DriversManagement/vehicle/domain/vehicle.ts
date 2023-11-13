export class Vehicle{
    constructor(
        public uuid:string,
        public brand:string,
        public model:string,
        public plate_number:string,
        public name_association:string,
        public vin:string,
        public url_img_vehicle:string,
        public uuid_driver:string,
        public status:boolean,
    ){}
}