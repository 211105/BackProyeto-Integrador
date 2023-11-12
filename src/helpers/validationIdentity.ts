import * as vision from '@google-cloud/vision';

// Ruta a tu archivo JSON de credenciales
const credentialsPath = 'src/helpers/sacred-bridge-404705-29cf2d63268d.json';

// Configuración del cliente de Vision
const client = new vision.ImageAnnotatorClient({ keyFilename: credentialsPath });

export async function detectText(imageData: string): Promise<string[]> {
  try {
      const [result] = await client.textDetection({
          image: { content: imageData },
      });

      const detections = result?.textAnnotations || [];

      if (detections.length > 0) {
          const extractedText = detections.map((text) => text.description || '');
          return extractedText;
      } else {
          return [];
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

export function validateFields(extractedText: string[], fields: Record<string, string>): boolean {
  console.log('Texto extraído:', extractedText);
  for (const fieldName in fields) {
      const expectedValue = fields[fieldName].toUpperCase();
      console.log(`Campo a buscar: '${expectedValue}'`);
      const regex = new RegExp(`\\b${expectedValue}\\b`, 'i'); // Coincidencia exacta, sin distinción entre mayúsculas y minúsculas

      const isFieldValid = extractedText.some(line => regex.test(line));

      if (!isFieldValid) {
          console.log(`Campo '${fieldName}' no coincide.`);
          return false;
      }
  }

  return true;
}








