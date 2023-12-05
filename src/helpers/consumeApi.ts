// HttpService.ts

export class HttpService {
    async fetchData(url: string): Promise<any> {
        try {
            const response = await fetch(url);
            // Asegúrate de manejar respuestas no exitosas adecuadamente
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al realizar la solicitud', error);
            throw error; // O manejar el error como prefieras
        }
    }
}
