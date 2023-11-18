export class Note{
    constructor(
        public uuid:string,
        public user_uuid:string,
        public folder_uuid:string,
        public title:string,
        public description:string,
        public status:boolean,
    ){}
}