import { Request, Response } from "express";
import { CreateNoteUseCase } from "../../application/createNoteUseCase";
import { Note } from "../../domain/note";
import { verificarUsuario } from "../service/userVerify";
import axios, { AxiosError } from 'axios';

export class CreateNoteController {
    constructor(readonly createNoteUseCase: CreateNoteUseCase) { }

    async post(req: Request, res: Response) {

        try {

            let { user_uuid, title, description } = req.body;

            const authToken = req.header('Authorization');
            // Validate the existence of the user before creating the note
            const userExists = await verificarUsuario(user_uuid,authToken!);
            if (!userExists) {
                return res.status(404).send({
                    status: "error",
                    message: `The user ${user_uuid} does not exist. Cannot create the note.`
                });
            }

            // Continue with note creation if the user exists
            const createFile = await this.createNoteUseCase.post(user_uuid,title,description,false);

            if (createFile instanceof Note) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: createFile.uuid,
                        user_uuid: createFile.user_uuid,
                        title: createFile.title,
                        description: createFile.description,
                        status: createFile.status
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the Note."
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error en la solicitud HTTP: ${(error as AxiosError).message}, Código de estado: ${(error as AxiosError).response?.status}`);
                if ((error as AxiosError).response?.status === 500) {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while verifying the user. The user may not exist."
                    });
                }
            } else if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
                return res.status(500).send({
                    status: "error",
                    message: error.message // Customize the error message as needed
                });
            } else {
                console.error(`Error general: ${(error as Error).message}`);
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the Note."
            });
        }
    }
}


