import { UploadedFile } from 'express-fileupload';
import * as admin from 'firebase-admin';
import vision from '@google-cloud/vision';

import path from 'path';
import deleteFromFirebase from './deleteImage';
const keyFilename = path.join(__dirname, 'vision.json');
// const client = new vision.ImageAnnotatorClient({ keyFilename });


const client = new vision.ImageAnnotatorClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL || 'default_project_id',
      private_key: process.env.GOOGLE_PRIVATE_KEY || ' default_client_email'
    }
  });

/**
 * Sube un archivo a Firebase Storage y devuelve su URL pública.
 *
 * @param {UploadedFile} file El archivo a subir.
 * @returns {Promise<string>} La URL pública del archivo subido.
 */
async function uploadToFirebase(file: UploadedFile): Promise<string | null> {
    const bucket = admin.storage().bucket();

    return new Promise((resolve, reject) => {
        // Genera un nombre único para el archivo basado en la fecha y el nombre original
        const uniqueName = `${Date.now()}-${file.name}`;
        const blob = bucket.file(uniqueName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on('error', (error) => {
            reject("Error uploading to Firebase Storage: " + error);
        });
        blobStream.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            try {
                await evaluateImage(publicUrl);
                resolve(publicUrl);
            } catch (error) {
                await deleteFromFirebase(publicUrl);
                resolve(null);
            }
        });

        blobStream.end(file.data);
    });
}

async function evaluateImage(url: string): Promise<void> {
    const [result] = await client.safeSearchDetection(url);
    console.log(result)
    const detections = result.safeSearchAnnotation;

    if (detections) {
        const isAdultContent = detections.adult === 'LIKELY' || detections.adult === 'VERY_LIKELY';
        const isViolentContent = detections.violence === 'LIKELY' || detections.violence === 'VERY_LIKELY';
    
        if (isAdultContent || isViolentContent) {
            throw new Error('La imagen contiene contenido inapropiado.');
        }
    }
    
}



export default uploadToFirebase;
