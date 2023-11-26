import { Bot } from "./bot";

export interface BotRepository{

    consultationProm(prom: string):Promise<Bot | null | string | Error>
}