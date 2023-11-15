import { S3Client, PutObjectCommand, GetObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Credentials } from '@aws-sdk/types';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";  // Importa la función para firmar URL
import dotenv from 'dotenv';

dotenv.config();

const credentials: Credentials = {
  accessKeyId: process.env.ACCESS_KEY || '',
  secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
};

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION || '',
  credentials,
});

export async function uploadToS3(fileBuffer: Buffer, key: string, contentType: string): Promise<string> {
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME || '',
    Body: fileBuffer,
    Key: key,
    ContentType: contentType,
  };

  try {
    // Subir el archivo a S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Generar una URL firmada que expire en 5 minutos (ajusta según sea necesario)
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME || '',
      Key: key,
    });
    const signedUrl = await getSignedUrl(s3Client, command);

    return signedUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error; // Re-lanzar el error para que se maneje en el controlador
  }
}

export async function deleteFromS3(key: string): Promise<void> {
    try {
      const deleteParams = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: key,
      };
  
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error("Error deleting from S3:", error);
      throw error;
    }
  }