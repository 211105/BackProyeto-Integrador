import { Request, Response } from "express";
import { CreateNoteUseCase } from "../../application/createNoteUseCase";
import { Note } from "../../domain/note";
import { verificarUsuario } from "../service/userVerify";

export class CreateNoteController {
    constructor(readonly createNoteUseCase: CreateNoteUseCase) { }

    async post(req: Request, res: Response) {

        interface NoteWithCreatedAt extends Note {
            created_at: Date;
        }

        try {
            let { user_uuid, title, description } = req.body;

            // Verifica la existencia del usuario antes de crear la nota
            await verificarUsuario(user_uuid);

            const createFile = await this.createNoteUseCase.post(
                user_uuid,
                title,
                description,
                false
            );

            const noteWithCreatedAt = createFile as NoteWithCreatedAt;

            if (createFile instanceof Note) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        uuid: noteWithCreatedAt.uuid,
                        user_uuid: noteWithCreatedAt.user_uuid,
                        title: noteWithCreatedAt.title,
                        description: noteWithCreatedAt.description,
                        status: noteWithCreatedAt.status,
                        created_at: noteWithCreatedAt.created_at
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the Note."
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
                return res.status(500).send({
                    status: "error",
                    message: error.message // Puedes personalizar el mensaje de error según tus necesidades
                });
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the Note."
            });
        }
    }
}
