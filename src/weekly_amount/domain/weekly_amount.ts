export class Weeklyamount{
    constructor(
        public uuid:string,
        public user_uuid:string,
        public amount:number,
        public amount_update:number,
        public create_date: string,
        public end_date: string,
        public status:boolean
    ){}
}