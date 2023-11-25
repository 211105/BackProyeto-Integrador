import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';


export class ValidatorAddActivity  {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(0,150)
    public name: string;

    @IsNotEmpty()
    @IsString()
    public imgUrl: string;

    constructor(
        uuid: string,
        name: string,
        imgUrl: string
    ) {
        this.uuid = uuid,
        this.name = name,
        this.imgUrl = imgUrl
    }
}


export class ValidatorDeleteActivity {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    constructor(
        uuid: string,
    ) {
        this.uuid = uuid
    }
}

export class ValidatorUpdateActivity{
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public imgUrl?: string;

    constructor(
        uuid: string,
        name?: string,
        imgUrl?: string
    ){
        this.uuid = uuid,
        this.name = name,
        this.imgUrl = imgUrl
    }
}