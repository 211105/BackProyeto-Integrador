import { IsOptional ,ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, IsString, IsUUID, Length, IsEmail, IsNotEmpty } from 'class-validator';


export class ValidatorRegister {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public driver_uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public vehicle_uuid: string;

    constructor(
        uuid: string,
        driver_uuid: string,
        vehicle_uuid: string,
    ) {
        this.uuid = uuid;
        this.driver_uuid = driver_uuid;
        this.vehicle_uuid = vehicle_uuid;
    }
}
