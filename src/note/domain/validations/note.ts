import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorFile {
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
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsString()
    public url_file: string;

    @IsNotEmpty()
    @IsString()
    public type_file: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    constructor(
        uuid: string,
        user_uuid: string,
        title: string,
        description: string,
        url_file: string,
        type_file: string,
        status: boolean

    ) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.title = title;
        this.description = description;
        this.url_file = url_file;
        this.type_file = type_file;
        this.status = status;

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

export class ValidatorupdatePassword {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        uuid: string,
        password: string
    ) {
        this.uuid = uuid;
        this.password = password;
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

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public email?: string;

    @IsOptional()
    @IsString()
    @Length(10)  
    public phone_number?: string;

    @IsOptional()
    @IsString()
    public img_url?: string;

   
    constructor( 
        uuid: string,
        name?: string,
        email?: string,
        phone_number?: string,
        img_url?: string,
        ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number
        this.img_url = img_url
    }
}