import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';



export class ValidatorCreateMark {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsNumber()
    public latitude: number;

    @IsNotEmpty()
    @IsNumber()
    public longitude: number;

    @IsString()
    @Length(0,600)
    public description: string;

    @IsNotEmpty()
    @IsString()
    public endDate: string;

    @IsNotEmpty()
    @IsString()
    public urlImage: string;

    @IsNotEmpty()
    @IsUUID()
    public userUuid: string;

    @IsNotEmpty()
    @IsUUID()
    public activityUuid: string;
    constructor(
        uuid: string,
        latitude: number,
        longitude: number,
        description: string,
        endDate: string,
        urlImage: string,
        userUuid: string,
        activityUuid: string,
    ) {
        this.uuid = uuid,
        this.latitude = latitude,
        this.longitude = longitude,
        this.description = description,
        this.endDate = endDate,
        this.urlImage = urlImage,
        this.userUuid = userUuid,
        this.activityUuid = activityUuid
    }
}

export class ValidatorListMark {

    @IsNotEmpty()
    @IsNumber()
    public userLatitude: number;

    @IsNotEmpty()
    @IsNumber()
    public userLongitude: number;
    constructor(
        userLatitude: number,
        userLongitude: number
    ) {
        this.userLatitude = userLatitude,
        this.userLongitude = userLongitude
    }
}

export class ValidatorUserAssist {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string; 

    @IsNotEmpty()
    @IsUUID()
    public markUuid: string; 

    @IsNotEmpty()
    @IsUUID()
    public userUuid: string;
    
    @IsNotEmpty()
    @IsNumber()
    public latitude: number; 
    
    @IsNotEmpty()
    @IsNumber()
    public longitude: number;

    constructor(
        uuid: string, 
        markUuid: string, 
        userUuid: string,
        latitude: number,
        longitude:number
    ) {
        this.uuid = uuid;
        this.markUuid = markUuid;
        this.userUuid = userUuid; 
        this.latitude = latitude;
        this.longitude = longitude;
    }
}