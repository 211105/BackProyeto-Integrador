import { Request, Response } from "express";
import { CreateFileUseCase } from "../../application/createFileUseCase";
import { UploadedFile } from "express-fileupload";
import uploadToFirebase from "../../../helpers/saveImages";
import { File } from "../../domain/file";
import { verificarUsuario } from "../service/userVerify";

export class CreateFileController {
    constructor(readonly createFileUseCase: CreateFileUseCase) { }

    async post(req: Request, res: Response) {

        try {
            let { user_uuid,notes_uuid } = req.body;
            const authToken = req.header('Authorization');

            // Validate the existence of the user before creating the note
            const userExists = await verificarUsuario(user_uuid,authToken!);
            if (!userExists) {
                return res.status(404).send({
                    status: "error",
                    message: `The user ${user_uuid} does not exist. Cannot create the note.`
                });
            }

            // Castear el archivo a UploadedFile (express-fileupload)
            const imgFile = req.files?.url_file as UploadedFile | null;
            const fileName = imgFile?.name;
            const url_file = await uploadToFirebase(imgFile);

            const createFile = await this.createFileUseCase.post(
                user_uuid,
                notes_uuid,
                fileName || "",
                url_file,
                '', 
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