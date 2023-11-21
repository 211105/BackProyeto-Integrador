import { query } from "../../database/connection";
import { Note } from "../domain/note";
import { NoteRepository } from "../domain/noteRepository";

export class MysqlNoteRepository implements NoteRepository {
    
    async createNote(uuid: string, user_uuid: string,title: string, description: string, status: boolean): Promise<string | Note | Error | null> {
        try {
    
            let sql = "INSERT INTO notes(uuid, user_uuid, title, description, status) VALUES (?, ?, ?, ?, ?)";
            // Imprime los valores para depurar
            console.log('Params:', uuid, user_uuid ,title, description, status);
            const params: any[] = [uuid, user_uuid ,title, description, status];
            const [result]: any = await query(sql, params);
            // Ajusta la creación de la instancia Note según los campos de la tabla
            return new Note(uuid, user_uuid ,title, description, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    async updateNote(uuid: string, title?: string, description?: string): Promise<Note | Error | null> {
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

            // Construye un objeto que contiene los campos a actualizar
            const updateFields: { [key: string]: any } = {};
            if (title !== undefined) {
                updateFields.title = title;
            }
            if (description !== undefined) {
                updateFields.description = description;
            }

            // Verifica si hay campos para actualizar
            if (Object.keys(updateFields).length === 0) {
                // Si no hay campos para actualizar, devuelve la nota actual sin cambios
                return new Note(
                    currentNote.uuid,
                    currentNote.user_uuid,
                    currentNote.title,
                    currentNote.description,
                    currentNote.status,
                );
            }

            // Construye la consulta de actualización dinámicamente
            const updateSql = "UPDATE notes SET " + Object.keys(updateFields).map((field) => `${field} = ?`).join(", ") + " WHERE uuid = ?";
            const updateParams: any[] = [...Object.values(updateFields), uuid];
            const [updateResult]: any = await query(updateSql, updateParams);

            // Verifica si se actualizó alguna fila en la base de datos
            if (updateResult.affectedRows > 0) {
                // Si se actualizó, crea una nueva instancia de Note con los valores actuales
                // excepto por los campos que se actualizaron
                return new Note(
                    currentNote.uuid,
                    currentNote.user_uuid,
                    title !== undefined ? title : currentNote.title,
                    description !== undefined ? description : currentNote.description,
                    currentNote.url_file,                    
                );
            } else {
                // Si no se actualizó ninguna fila, el UUID podría no existir en la tabla
                return null;
            }
        } catch (error) {
            console.error("Error updating note:", error);
            return error as Error;
        }
    }
    async getNoteByUser(user_uuid: string): Promise<Note[] | Error | null> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM notes WHERE user_uuid = ?";
            const params: any[] = [user_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const notes = result.map((row: any) => {
                    return new Note(
                        row.uuid,
                        row.user_uuid,
                        row.title,
                        row.description,
                        row.status,
                    );
                });

                return notes;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving files by user:", error);
            return error as Error;
        }
    }
    async delteFile(uuid: string): Promise<string | Error | Note | null> {
        try {
            // Elimina la nota de la base de datos
            const deleteSql = "DELETE FROM notes WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            const [deleteResult]: any = await query(deleteSql, deleteParams);

            // Verifica si se eliminó alguna fila en la base de datos
            if (deleteResult.affectedRows > 0) {
                return "La nota se ha eliminado correctamente.";
            } else {
                // Si no se eliminó ninguna fila, el UUID podría no existir en la tabla
                return "La nota con el UUID especificado no existe.";
            }
        } catch (error) {
            console.error("Error deleting file:", error);
            return error as Error;
        }
    }
}

