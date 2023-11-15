import { Owner } from "../domain/owner";
import { OwnerRepository } from "../domain/ownerRepostitory";
import { ValidatorUuid } from "../domain/validations/owner";
import { validate } from "class-validator";



export class DeleteOwnerUseCase{
    constructor(readonly ownerRepository: OwnerRepository){}

    async delete(uuid: string):Promise<Owner | null | string>{

        let data = new ValidatorUuid(uuid);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const deleteOwner = await this.ownerRepository.deleteOwnner(uuid);
            return deleteOwner;
        } catch (error) {
            return null;
        }
    }
}