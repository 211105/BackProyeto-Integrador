## Configuración del Entorno
Antes de comenzar, asegúrate de tener instalado Node.js y npm. Este proyecto utiliza un archivo .env para gestionar las variables de entorno.

### Creación del Archivo .env
Crea un archivo .env en la raíz del proyecto.

Asegúrate de agregar .env a tu .gitignore para no subir tus credenciales a GitHub.

Añade las siguientes variables de entorno al archivo .env, reemplazando los valores entre corchetes con tus propias credenciales:

#### Para los servicios usuarios, file, note, expense, y weekly:
DB_HOST = [Tu Host de Base de Datos]

DB_USER = [Tu Usuario de Base de Datos]

DB_DATABASE = [Nombre de tu Base de Datos]

DB_PASSWORD = [Tu Contraseña de Base de Datos]

KEY_TOKEN = [Tu Token de Seguridad]

PORT = [Puerto en el que se ejecutará tu aplicación]

#### Para el servicio de marks:
DB_HOST = [Tu Host de Base de Datos]

DB_USER = [Tu Usuario de Base de Datos]

DB_DATABASE = [Nombre de tu Base de Datos]

DB_PASSWORD = [Tu Contraseña de Base de Datos]

KEY_TOKEN = [Tu Token de Seguridad]

PORT = [Puerto en el que se ejecutará tu aplicación]

FIREBASE_PROJECT_ID = [ID de tu Proyecto en Firebase]

FIREBASE_STORAGE_BUCKET = [Bucket de Almacenamiento en Firebase]

FIREBASE_PRIVATE_KEY = [Clave Privada de Firebase]

FIREBASE_CLIENT_EMAIL = [Email del Cliente en Firebase]

FIREBASE_CLIENT_ID = [ID del Cliente en Firebase]

GOOGLE_CLIENT_EMAIL = [Email del Cliente de Google]

GOOGLE_PRIVATE_KEY = [Clave Privada de Google]

#### Instalación de Dependencias
Ejecuta el siguiente comando para instalar las dependencias necesarias:

 npm install 

#### Ejecución del Proyecto
Para iniciar el servidor de desarrollo, ejecuta:

 npm run dev
