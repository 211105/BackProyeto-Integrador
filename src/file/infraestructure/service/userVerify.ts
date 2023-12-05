import axios, { AxiosError, AxiosResponse } from 'axios';

export async function verificarUsuario(user_uuid: string): Promise<boolean> {
    console.log('Verificando si el usuario existe...');
    try {
        const servicioUrl = `https://allgate.cristilex.com/api/v1/users/${user_uuid}`;
        const response: AxiosResponse = await axios.get(servicioUrl);

        if (response.status === 200 ||  response.status === 201) {
            console.log(`El usuario ${user_uuid} existe.`);
            return true; // User exists
        } else if (response.status === 404) {
            console.log(`El usuario ${user_uuid} no existe.`);
            return false; // User does not exist
        } else if (response.status === 500) {
            // Handle 500 error as needed
            console.error('Error en el servidor:', response);
            return false;
        } else {
            // Handle other status codes
            throw new Error(`Error en la solicitud HTTP. Código de estado: ${response.status}`);
        }
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error(`Error en la solicitud HTTP: ${(error as AxiosError).message}, Código de estado: ${(error as AxiosError).response?.status}`);
        } else {
            console.error(`Error general: ${(error as Error).message}`);
        }
        throw error;
    }
}