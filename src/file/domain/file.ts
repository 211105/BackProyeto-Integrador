export class File{
    constructor(
        public uuid:string,
        public user_uuid:string,
        public folder_uuid:string,
        public title:string,
        public url_file:string,
        public type_file:string,
        public status:boolean,
    ){}
}