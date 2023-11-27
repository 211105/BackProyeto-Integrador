import { IsOptional ,ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, IsString, IsUUID, Length, IsEmail, IsNotEmpty, IsNumber, isString, IsBoolean } from 'class-validator';


export class ValidatorCreate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public user_uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public driver_uuid: string;

    @IsNotEmpty()
    @IsNumber()
    public rating: number;

    @IsNotEmpty()
    @IsString()
    public commet_text: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    

    constructor(
        uuid: string,
        user_uuid: string,
        driver_uuid: string,
        rating: number,
        commet_text: string,
        status: boolean
        
    ) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.driver_uuid = driver_uuid;
        this.rating = rating;
        this.commet_text = commet_text;
        this.status = status;
    
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