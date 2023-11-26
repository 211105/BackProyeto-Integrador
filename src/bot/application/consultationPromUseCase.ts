import { Bot } from "../domain/bot";
import { BotRepository } from "../domain/botRepository";
import { validate } from "class-validator";
import { ValidatorProm } from "../domain/validations/bot";



export class ConsultationPromUseCase {
    constructor(readonly botRepository: BotRepository) {}

    async post(prom: string): Promise<Bot | null | string | Error> {

        //validator-class
        let data = new ValidatorProm(prom);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createProm = await this.botRepository.consultationProm(prom);
            return createProm;
            
        } catch (error) {
            return new Error('An unexpected error occurred');
        }
    }
}
