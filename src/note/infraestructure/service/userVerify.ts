import axios from 'axios';

export async function verificarUsuario(user_uuid: string): Promise<void> {
    console.log('Verificando si el usuario existe...');
    try {
        // URL del servicio que trae la información del usuario
        const servicioUrl = `https://allgate.cristilex.com/api/v1/users/${user_uuid}`;

        // Realizar la solicitud HTTP al servicio para obtener la información del usuario
        const response = await axios.get(servicioUrl);

        // Verificar si el usuario existe en la respuesta
        if (response.data && response.data.user_uuid === user_uuid) {
            console.log(`El usuario ${user_uuid} existe.`);
        } else {
            console.log(`El usuario ${user_uuid} no existe. Mensaje adicional si es necesario.`);
            // Puedes agregar un mensaje adicional aquí si lo deseas
            throw new Error(`El usuario ${user_uuid} no existe.`);
        }
    } catch (error) {
        console.error(`Error en la solicitud HTTP: ${(error as Error).message}`);
        throw error; // Relanza el error para que el controlador pueda manejarlo adecuadamente
    }
}
