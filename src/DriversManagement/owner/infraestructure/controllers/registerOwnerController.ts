// Importa los módulos necesarios
import { Request, Response } from "express";
import { RegisterOwnerUseCase } from "../../application/registerOwnerUseCase";
import { UploadedFile } from 'express-fileupload';
import { Owner } from "../../domain/owner";
import uploadToFirebase from '../../../../helpers/saveImages';

export class RegisterOwnerController {
  constructor(readonly registerOwnerUseCase: RegisterOwnerUseCase) { }

  async post(req: Request, res: Response) {
    try {
      // Desestructura los datos del cuerpo de la solicitud
      const { name, surname, second_surname, email, password, phone_number } = req.body;

      // Verifica si se cargó un archivo en la solicitud
      if (!req.files || !req.files.img_url) {
        return res.status(400).send({
          status: 'error',
          message: 'No image file uploaded (img_url).',
        });
      }

      console.log("Before uploading to Firebase...");

      // Castear el archivo a UploadedFile (express-fileupload)
      const fileVehicle = req.files.img_url as UploadedFile;

      // Llama a la función para cargar el archivo a Firebase
      const url_img = await uploadToFirebase(fileVehicle);

      console.log("After uploading to Firebase. URL:", url_img);

      // Llama a la función para registrar al propietario
      let registerOwner = await this.registerOwnerUseCase.post(
        name, surname, second_surname, email, password, phone_number, url_img, "Owner", false
      );

      // Verifica el resultado de la operación de registro
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
            img_url: registerOwner.img_url,
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
      if (error instanceof Error) {
        if (error.message.startsWith('[')) {
            return res.status(400).send({
                status: "error",
                message: "Validation failed",
                errors: JSON.parse(error.message)
            });
        }
    }
    return res.status(500).send({
        status: "error",
        message: "An error occurred while adding the Driver."
    });
    }
  }
}