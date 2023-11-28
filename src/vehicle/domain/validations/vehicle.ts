import {IsOptional , ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, IsString, IsUUID, Length, IsEmail, IsNotEmpty } from 'class-validator';


export class ValidatorRegisterVehicle {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public brand: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public model: string;

    @IsNotEmpty()
    @IsString()
    @Length(6,7)
    public plate_number: string;

    @IsString()
    public name_association: string;

    @IsString()
    public vin: string;

    @IsNotEmpty()
    @IsString()
    public url_img: string;

    @IsNotEmpty()
    @IsUUID()
    public uuid_driver: string;


    constructor(
        uuid: string,
        brand: string,
        model: string,
        plate_number: string,
        name_association: string,
        vin: string,
        url_img: string,
        uuid_driver: string,
    ) {
        this.uuid = uuid;
        this.brand = brand;
        this.model = model;
        this.plate_number = plate_number;
        this.name_association = name_association;
        this.vin = vin;
        this.url_img = url_img;
        this.uuid_driver = uuid_driver;
    }
}

export class ValidatorUpdateVehicle {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    public brand?: string;

    @IsOptional()
    @IsString()
    public model?: string;

    @IsOptional()
    @IsString() 
    public plate_number?: string;

    @IsOptional()
    @IsString() 
    public name_association?: string;

    @IsOptional()
    @IsString() 
    public vin?: string;

    @IsOptional()
    @IsString() 
    public url_img?: string;

    
    

    constructor(
        uuid: string,
        brand?:string,
        model?: string,
        plate_number?: string,
        name_association?:string,
        vin?:string,
        url_img?: string
    ) {
        this.uuid = uuid;
        this.brand = brand;
        this.model = model;
        this.plate_number = plate_number;
        this.name_association = name_association;
        this.vin = vin;
        this.url_img = url_img;
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
