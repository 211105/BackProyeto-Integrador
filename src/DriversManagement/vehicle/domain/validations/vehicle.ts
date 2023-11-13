import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, IsString, IsUUID, Length, IsEmail, IsNotEmpty } from 'class-validator';


export class ValidatorRegisterDriver {
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
    @Length(7)
    public plate_number: string;

    @IsNotEmpty()
    @IsString()
    public name_association: string;

    @IsNotEmpty()
    @IsString()
    public vin: string;

    @IsNotEmpty()
    @IsString()
    public url_img_vehicle: string;

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
        url_img_vehicle: string,
        uuid_driver: string,
    ) {
        this.uuid = uuid;
        this.brand = brand;
        this.model = model;
        this.plate_number = plate_number;
        this.name_association = name_association;
        this.vin = vin;
        this.url_img_vehicle = url_img_vehicle;
        this.uuid_driver = uuid_driver;
    }
}