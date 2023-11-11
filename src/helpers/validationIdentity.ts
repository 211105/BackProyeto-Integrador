import * as vision from '@google-cloud/vision';
import * as fs from 'fs';

// Ruta a tu archivo JSON de credenciales
const credentialsPath = 'src/sacred-bridge-404705-29cf2d63268d.json';

// Ruta a la imagen que deseas procesar
const imagePath = 'src/WhatsApp Image 2023-11-09 at 8.54.33 PM.jpeg';

// Configuración del cliente de Vision
const client = new vision.ImageAnnotatorClient({ keyFilename: credentialsPath });

// Lee la imagen como bytes
const imageBuffer = fs.readFileSync(imagePath);

// Convierte la imagen a base64
const base64Image = imageBuffer.toString('base64');

// Realiza la solicitud al servicio de Vision API
async function detectText(imageData: string) {
  try {
    const [result] = await client.textDetection({
      image: { content: imageData },
    });

    const detections = result?.textAnnotations;

    if (detections) {
      console.log('Texto extraído:');
      detections.forEach((text) => {
        console.log(text.description);
      });
    } else {
      console.log('No se detectó texto en la imagen.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Llamada a la función principal
detectText(base64Image);
