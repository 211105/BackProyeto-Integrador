import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';


export class ValidatorCreate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public user_uuid: string;

    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    constructor(
        uuid: string,
        user_uuid: string,
        amount: number,
    ) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.amount = amount;
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