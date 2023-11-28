import { IsOptional ,ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, IsString, IsUUID, Length, IsEmail, IsNotEmpty } from 'class-validator';

@ValidatorConstraint({ name: 'isCurpValid', async: false })
export class IsCurpValidConstraint implements ValidatorConstraintInterface {
    validate(curp: string): boolean {
        return /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/.test(curp);
    }

    defaultMessage(): string {
        return 'La CURP ingresada no es válida';
    }
}

export function IsCurpValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCurpValidConstraint,
        });
    };
}

export class ValidatorRegisterDriver {
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
    public url_photography: string;

    @IsNotEmpty()
    @IsCurpValid() 
    public identification_number: string;

    @IsString()
    public url_identification: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    public phone: string;

    @IsNotEmpty()
    @IsUUID()
    public owner_uuid: string;

    constructor(
        uuid: string,
        name: string,
        surname: string,
        second_surname: string,
        email: string,
        password: string,
        url_photography: string,
        identification_number: string,
        url_identification: string,
        phone: string,
        owner_uuid:string,
    ) {
        this.uuid = uuid;
        this.name = name;
        this.surname = surname;
        this.second_surname = second_surname;
        this.email = email;
        this.password = password;
        this.url_photography = url_photography;
        this.identification_number = identification_number;
        this.url_identification = url_identification;
        this.phone = phone;
        this.owner_uuid = owner_uuid;

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

export class ValidatorIdetity {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public url_identification: string;

    constructor(
        uuid: string,
        url_identification: string
    ) {
        this.uuid = uuid;
        this.url_identification = url_identification;
    }
}

export class ValidatorUpdateDriver {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    public email?: string;

    @IsOptional()
    @IsString()
    public url_photography?: string;

    @IsOptional()
    @IsString()
    @Length(10) 
    public phone?: string;
    
    

    constructor(
        uuid: string,
        email?:string,
        url_photography?: string,
        phone?: string
    ) {
        this.uuid = uuid;
        this.email = email;
        this.url_photography = url_photography;
        this.phone = phone;
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