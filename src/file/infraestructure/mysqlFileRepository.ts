import { query } from "../../database/connection";
import { File } from "../domain/file";
import { FileRepository } from "../domain/fileRepository";

export class MysqlFileRepository implements FileRepository {
    async createFile(uuid: string, user_uuid: string,  folder_uuid: string,title: string, url_file: string, type_file: string, status: boolean): Promise<Error | File | null | string> {
        try {
            // const hashPassword = await encrypt(password)
    
            let sql = "INSERT INTO files(uuid, user_uuid, folder_uuid, title, url_file, type_file, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
            // Imprime los valores para depurar
            console.log('Params:', uuid, user_uuid, folder_uuid, title,  url_file, type_file, status);
            const params: any[] = [uuid, user_uuid, folder_uuid,title, url_file, type_file, status];
            const [result]: any = await query(sql, params);
            // Ajusta la creación de la instancia Note según los campos de la tabla
            return new File(uuid, user_uuid,folder_uuid ,title, url_file, type_file, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async updateFile(uuid: string, title: string): Promise<File | Error | null> {
        try {
            // Primero, obtén los valores actuales de la nota
            const selectSql = "SELECT * FROM files WHERE uuid = ?";
            const selectParams: any[] = [uuid];
            const [selectResult]: any = await query(selectSql, selectParams);

            // Verifica si la nota existe
            if (selectResult.length === 0) {
                return null; // La nota no existe
            }

            // Recupera los valores actuales
            const currentNote = selectResult[0];

            // Luego, realiza la actualización del campo 'title'
            const updateSql = "UPDATE files SET title = ? WHERE uuid = ?";
            const updateParams: any[] = [title, uuid];
            const [updateResult]: any = await query(updateSql, updateParams);

            // Verifica si se actualizó alguna fila en la base de datos
            if (updateResult.affectedRows > 0) {
                // Si se actualizó, crea una nueva instancia de Note con los valores actuales
                // excepto por el campo 'title' que se actualiza
                return new File(
                    currentNote.uuid,
                    currentNote.user_uuid,
                    currentNote.folder_uuid,
                    title,
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

    async getFilesByFolder(folder_uuid: string): Promise<File[] | Error | null> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM files WHERE folder_uuid = ?";
            const params: any[] = [folder_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const notes = result.map((row: any) => {
                    return new File(
                        row.uuid,
                        row.user_uuid,
                        row.folder_uuid,
                        row.title,
                        row.url_file,
                        row.type_file,
                        row.status
                    );
                });

                return notes;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving files by Files:", error);
            return error as Error;
        }
    }
    async delteFile(uuid: string): Promise<string | Error | File | null> {
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

