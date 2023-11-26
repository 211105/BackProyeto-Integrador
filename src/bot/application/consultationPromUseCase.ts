import { Bot } from "../domain/bot";
import { BotRepository } from "../domain/botRepository";

export class ConsultationPromUseCase {
    constructor(readonly botRepository: BotRepository) {}

    async post(prom: string): Promise<Bot | null | string | Error> {
        try {
            const createProm = await this.botRepository.consultationProm(prom);
            return createProm;
            
        } catch (error) {
            return new Error('An unexpected error occurred');
        }
    }
}
