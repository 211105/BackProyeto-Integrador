import axios, { AxiosError, AxiosResponse } from 'axios';

export async function verificarUsuario(user_uuid: string, authToken: string): Promise<boolean> {
    console.log('Verificando si el usuario existe...');
    try {
        const servicioUrl = `http://localhost:3000/api/v1/users/${user_uuid}`;
        
        // Configurar los encabezados con el token de autenticación
        const headers = {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',  // Ajusta según sea necesario
        };

        const response: AxiosResponse = await axios.get(servicioUrl, { headers });

        if (response.status === 200 || response.status === 201) {
            console.log(`El usuario ${user_uuid} existe.`);
            return true; // Usuario existe
        } else if (response.status === 404) {
            console.log(`El usuario ${user_uuid} no existe.`);
            return false; // Usuario no existe
        } else if (response.status === 500) {
            // Manejar error 500 según sea necesario
            console.error('Error en el servidor:', response);
            return false;
        } else {
            // Manejar otros códigos de estado
            throw new Error(`Error en la solicitud HTTP. Código de estado: ${response.status}`);
        }
    } catch (error) {
        // Manejar errores
        if (axios.isAxiosError(error)) {
            console.error(`Error en la solicitud HTTP: ${(error as AxiosError).message}, Código de estado: ${(error as AxiosError).response?.status}`);
        } else {
            console.error(`Error general: ${(error as Error).message}`);
        }
        throw error;
    }
}
