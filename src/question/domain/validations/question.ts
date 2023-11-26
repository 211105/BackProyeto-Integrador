import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';



export class ValidatorCreate {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public prom: string;

    constructor(uuid:string,prom:string) {
        this.uuid = uuid,
        this.prom = prom
    }
}
