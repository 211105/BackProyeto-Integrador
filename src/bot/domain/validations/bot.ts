import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';



export class ValidatorProm {
    @IsNotEmpty()
    @IsString()
    public prom: string;
    constructor(prom:string) {
        this.prom = prom;
    }
}
