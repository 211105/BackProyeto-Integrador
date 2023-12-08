import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorFile {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public user_uuid: string;

    @IsNotEmpty()
    @IsUUID()
    public notes_uuid: string;


    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public title: string;

    @IsNotEmpty()
    @IsString()
    public url_file: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    constructor(
        uuid: string,
        user_uuid: string,
        notes_uuid: string,
        title: string,
        
        url_file: string,
        status: boolean

    ) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.notes_uuid = notes_uuid;
        this.title = title;
        
        this.url_file = url_file;
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

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public description?: string;

   
    constructor( 
        uuid: string,
        title?: string,
        description?: string,
        ) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
    }
}

