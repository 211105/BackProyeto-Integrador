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
    
    async updateFileName(uuid: string, title: string): Promise<Note | Error | null> {
        try {
            // Primero, obtén los valores actuales de la nota
            const selectSql = "SELECT * FROM notes WHERE uuid = ?";
            const selectParams: any[] = [uuid];
            const [selectResult]: any = await query(selectSql, selectParams);

            // Verifica si la nota existe
            if (selectResult.length === 0) {
                return null; // La nota no existe
            }

            // Recupera los valores actuales
            const currentNote = selectResult[0];

            // Luego, realiza la actualización del campo 'title'
            const updateSql = "UPDATE notes SET title = ? WHERE uuid = ?";
            const updateParams: any[] = [title, uuid];
            const [updateResult]: any = await query(updateSql, updateParams);

            // Verifica si se actualizó alguna fila en la base de datos
            if (updateResult.affectedRows > 0) {
                // Si se actualizó, crea una nueva instancia de Note con los valores actuales
                // excepto por el campo 'title' que se actualiza
                return new Note(
                    currentNote.uuid,
                    currentNote.user_uuid,
                    title,
                    currentNote.description,
                    currentNote.url_file,
                    currentNote.type_file,
                    currentNote.status
                );
            } else {
                // Si no se actualizó ninguna fila, el UUID podría no existir en la tabla
                return null;
            }
        } catch (error) {
            console.error("Error updating file name:", error);
            return error as Error;
        }
    }
}

