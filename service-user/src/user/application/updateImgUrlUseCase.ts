import { validate } from "class-validator";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorImg } from "../domain/validations/user";

export class UpdateImgUrlUserUsecase {
    constructor(readonly usuarioRepository: IUsuarioRepository) { }

    async run(
        uuid: string,
        img_url: string
    ): Promise<User | null | Error> {

        let post = new ValidatorImg(uuid, img_url)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const updateImgUrl = await this.usuarioRepository.updateImgUrl(uuid, img_url);
            return updateImgUrl;
        } catch (error) {
            throw error;
        }
    }
}