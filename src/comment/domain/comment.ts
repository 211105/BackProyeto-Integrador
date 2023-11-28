export class Comment{
    constructor(
        public uuid:string,
        public user_uuid:string,
        public driver_uuid:string,
        public rating:number | string,
        public commet_text: string,
        public status:boolean
    ){}
}