import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';


export class ValidatorCreate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public weekly_amount_uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 20)
    public category: string;


    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    constructor(
        uuid: string,
        weekly_amount_uuid: string,
        category: string,
        amount: number,
    ) {
        this.uuid = uuid;
        this.weekly_amount_uuid = weekly_amount_uuid;
        this.category = category;
        this.amount = amount;
    }

}

export class ValidateLogin {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email:string,
        password:string,
    ){
        this.email = email,
        this.password = password
    }
}

export class ValidatorUuid {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    constructor(
        uuid: string,
    ) {
        this.uuid = uuid;
    }
}

export class ValidatorupdateAmount {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    constructor(
        uuid: string,
        amount: number
    ) {
        this.uuid = uuid;
        this.amount = amount;
    }
}