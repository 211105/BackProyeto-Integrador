import { Owner } from "../domain/owner";
import { OwnerRepository } from "../domain/ownerRepostitory";
import { validate } from "class-validator";
import { ValidatorUpdate } from "../domain/validations/owner";

export class UpdateOwnerUseCase{
    constructor(readonly ownerRepository: OwnerRepository){}

    async update(uuid: string,name?: string, surname?: string, second_surname?:string,email?: string,phone_number?:string,img_url?:string):Promise<Owner | null>{
        
        let data = new ValidatorUpdate(uuid, name,surname,second_surname,email,phone_number,img_url);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updates = await this.ownerRepository.updateOwner(uuid,name,surname,second_surname,email,phone_number,img_url);
            return updates;
        } catch (error) {
            return null;
        }
    }
}