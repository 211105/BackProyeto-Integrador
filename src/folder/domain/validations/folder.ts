import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorFolder {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public user_uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public title: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    constructor(
        uuid: string,
        user_uuid: string,
        title: string,
        status: boolean

    ) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.title = title;
        this.status = status;

    }


}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public title: string;
    constructor(uuid:string, title:string) {
        this.uuid = uuid
        this.title = title
    }
}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}