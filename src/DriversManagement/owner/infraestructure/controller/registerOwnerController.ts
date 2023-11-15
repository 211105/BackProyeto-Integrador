import { Request, Response } from "express";
import { RegisterOwnerUseCase } from "../../application/registerOwnerUseCase";
import { UploadedFile } from 'express-fileupload';
import { Owner } from "../../domain/owner";
import { uploadToS3 } from "../../../../helpers/saveImagesAWS";

export class RegisterOwnerController {
  constructor(readonly registerOwnerUseCase: RegisterOwnerUseCase) { }

  private generateS3Key(filename: string): string {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '');
    return `images/${timestamp}_${filename}`;
  }

  async post(req: Request, res: Response) {
    try {
      const { name, surname, second_surname, email, password, phone_number } = req.body;

      if (!req.files || !req.files.img_url) {
        return res.status(400).send({
          status: 'error',
          message: 'No image file uploaded img_url.',
        });
      }

      const imageFile = req.files.img_url as UploadedFile;
      const s3Key = this.generateS3Key(imageFile.name);

      // Llama a la función para subir a S3 y obtén la URL resultante
      const s3ImageUrl = await uploadToS3(imageFile.data, s3Key, imageFile.mimetype);

      // Llama a la función para registrar al propietario
      let registerOwner = await this.registerOwnerUseCase.post(
        name,
        surname,
        second_surname,
        email,
        password,
        phone_number,
        s3ImageUrl,
        "Owner",
        false
      );

      if (registerOwner instanceof Owner) {
        return res.status(201).send({
          status: 'success',
          data: {
            id: registerOwner.uuid,
            name: registerOwner.name,
            surname: registerOwner.surname,
            second_surname: registerOwner.second_surname,
            email: registerOwner.email,
            password: registerOwner.password,
            phone: registerOwner.phone_number,
            img_url: s3ImageUrl,
            type_user: registerOwner.type_user,
            status: registerOwner.status,
          },
        });
      } else {
        return res.status(500).send({
          status: 'error',
          message: 'An unexpected error occurred while registering the Owner.',
        });
      }
    } catch (error) {
      // Manejo de errores
      if (error instanceof Error) {
        if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
          return res.status(409).send({
            status: "error",
            message: "The email address is already in use. Please use a different email address.",
          });
        } else if (error.message.startsWith('[')) {
          return res.status(400).send({
            status: "error",
            message: "Validation failed",
            errors: JSON.parse(error.message),
          });
        }
      }

      // Para errores generales
      return res.status(500).send({
        status: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  }
}
