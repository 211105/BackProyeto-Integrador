import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Credentials } from '@aws-sdk/types';
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

  // Subir el archivo a S3
  await s3Client.send(new PutObjectCommand(uploadParams));

  // Construir y devolver la URL de la imagen en S3
  const s3ImageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
  return s3ImageUrl;
}
