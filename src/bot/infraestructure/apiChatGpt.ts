import { Bot } from "../domain/bot";
import { BotRepository } from "../domain/botRepository";
import dotenv from "dotenv"; 
import fetch from "node-fetch";

dotenv.config();

// Interfaz que refleja la estructura de la respuesta JSON de la API de ChatGPT
interface ChatGptApiResponse {
    // Ajusta esto según la estructura real de la respuesta JSON
    choices: [{ message: { content: string } }];
    // Otras propiedades que puedas recibir de la API de ChatGPT
}

export class ApiChatGpt implements BotRepository {
    private readonly apiKey: string;
    private readonly model: string; // Nuevo: agregar el modelo que deseas utilizar

    constructor() {
        // Cargar la API key y el modelo desde las variables de entorno
        this.apiKey = process.env.API_KEY_GPT || '';
        this.model = process.env.GPT_MODEL || 'gpt-3.5-turbo'; // Ajusta el modelo según tus necesidades
    }

    async consultationProm(prom: string): Promise<string | Error | Bot | null> {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.'
                        },
                        {
                            role: 'user',
                            content: prom
                        }
                    ],
                    model: this.model, // Nuevo: incluir el modelo en la solicitud
                    max_tokens: 100
                    // Puedes agregar más parámetros según la documentación de la API de ChatGPT
                })
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                throw new Error(`API request failed with status ${response.status}. Response: ${errorResponse}`);
            }

            const responseData = await response.json() as ChatGptApiResponse;

            // Utiliza la estructura correcta para acceder a la propiedad 'prom'
            const botResponse: Bot = {
                prom: responseData.choices[0]?.message?.content,
                // Otras propiedades según la estructura real de la respuesta
            };

            // Imprime el objeto 'botResponse'
            console.log('botResponse:', botResponse);

            return botResponse;
        } catch (error) {
            console.error('Error in consultationProm:', error);
            return error instanceof Error ? error : new Error('An unexpected error occurred');
        }
    }
}
