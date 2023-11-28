export class Driver{
    constructor(
        public uuid:string,
        public name:string,
        public surname:string,
        public second_surname:string,
        public email:string,
        public password:string,
        public url_photography:string,
        public identification_number: string,
        public url_identification : string,
        public phone:string,
        public status:boolean,
        public status_identity:boolean,
        public status_moto_selection:boolean,
        public owner_uuid:string,
        public type_user:string
    ){}
}

export class ResonseLogin{
    constructor(
        public uuid:string,
        public name:string,
        public surname:string,
        public second_surname:string,
        public email:string,
        public url_photography:string,
        public identification_number: string,
        public url_identification : string,
        public phone:string,
        public status:boolean,
        public token:string,

    ){}
}