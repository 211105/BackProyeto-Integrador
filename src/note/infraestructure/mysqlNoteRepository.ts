import { query } from "../../database/connection";
import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";

export class MysqlNoteRepository implements NoteRepository {
    async createFile(uuid: string, user_uuid: string, title: string, description: string, url_file: string, type_file: string, status: boolean): Promise<Error | Note | null> {
        try {
            // const hashPassword = await encrypt(password)
    
            let sql = "INSERT INTO notes(uuid, user_uuid, title, description, url_file, type_file, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            // Imprime los valores para depurar
            console.log('Params:', uuid, user_uuid, title, description, url_file, type_file, status);
            const params: any[] = [uuid, user_uuid, title, description, url_file, type_file, status];
            const [result]: any = await query(sql, params);
            // Ajusta la creación de la instancia Note según los campos de la tabla
            return new Note(uuid, user_uuid, title, description, url_file, type_file, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
}

