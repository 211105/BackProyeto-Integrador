import { IsString, IsUUID, Length, IsEmail, IsNotEmpty,IsOptional } from 'class-validator';


export class ValidatorRegisterOwner {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public surname: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public second_surname: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    public phone_number: string;

    @IsNotEmpty()
    @IsString()
    public img_url: string;


    constructor(
        uuid: string,
        name: string,
        surname: string,
        second_surname: string,
        email: string,
        password: string,
        phone_number: string,
        img_url: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.surname = surname;
        this.second_surname = second_surname;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.img_url = img_url;
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
    public surname?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public second_surname?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public email?: string;

    @IsOptional()
    @IsString()
    @Length(10)  
    public phone_number?: string;

   
    constructor( 
        uuid: string,
        name?: string,
        surname?: string,
        second_surname?: string,
        email?: string,
        phone_number?: string,
        ) {
        this.uuid = uuid;
        this.name = name;
        this.surname = surname;
        this.second_surname = second_surname;
        this.email = email;
        this.phone_number = phone_number
    }
}