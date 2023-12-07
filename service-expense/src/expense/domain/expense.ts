export class Expense{
    constructor(
        public uuid:string,
        public weekly_amount_uuid:string,
        public category:string,
        public amount:number
    ){}
}