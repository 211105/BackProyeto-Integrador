import { Request, Response } from "express";
import { CreateFileUseCase } from "../../application/createFileUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveFile";
import { File } from "../../domain/file";

export class CreateFileController {
    constructor(readonly createFileUseCase: CreateFileUseCase) { }

    async post(req: Request, res: Response) {

        try {
            let { user_uuid,notes_uuid } = req.body;

            if (!req.files || !req.files.url_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }

            // Castear el archivo a UploadedFile (express-fileupload)
            const imgFile = req.files.url_file as UploadedFile;

            let type_file: string | null = null;

            // Obtener el nombre del archivo
            const fileName = imgFile.name; // obtiene el nombre del archivo original
            console.log(fileName);
            const fileExtension = imgFile.name.split('.').pop(); // obtiene el tipo de archivo
            if (fileExtension) {
                switch (fileExtension.toLowerCase()) {
                    case 'png':
                        type_file = 'image/png';
                        break;
                    case 'jpg':
                    case 'jpeg':
                        type_file = 'image/jpeg';
                        break;
                    case 'gif':
                        type_file = 'image/gif';
                        break;
                    case 'mp3':
                        type_file = 'audio/mpeg';
                        break;
                    case 'wav':
                        type_file = 'audio/wav';
                        break;
                    case 'oog':
                        type_file = 'audio/ogg'; // Agrega esta línea para archivos "oog"
                        break;
                    case 'aac':
                        type_file = 'audio/aac'; // Agrega el tipo de archivo AAC
                        break;
                    case '""':
                        type_file = 'audio/aac'; // Agrega el tipo de archivo AAC
                        break;
                    case 'pdf':
                        type_file = 'document/pdf'; // Agrega el tipo de archivo PDF
                        break;
                }
            }

            // Asegurarte de que type_file no sea null antes de usarlo
            const url_file = await uploadToFirebase(imgFile, type_file!);
            console.log(url_file);

            const createFile = await this.createFileUseCase.post(
                user_uuid,
                notes_uuid,
                fileName,
                url_file,
                type_file || '', // Si type_file es null, usar un valor por defecto
                false
            );


            if (createFile instanceof File) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: createFile.uuid,
                        user_uuid: createFile.user_uuid,
                        notes_uuid: createFile.notes_uuid,
                        title: createFile.title,
                        url_file: createFile.url_file,
                        type_file: createFile.type_file, 
                        status: createFile.status
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the File."
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
                message: "An error occurred while adding the File."
            });
        }
    }
}