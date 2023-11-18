import { query } from "../../database/connection";
import { Folder } from "../domain/folder";
import { FolderRepository } from "../domain/folderRepository";

export class MysqlFolderRepostitory implements FolderRepository{
    async createFolder(uuid: string, user_uuid: string, title: string, status: boolean): Promise<string | Folder | Error | null> {
        try {
            let sql = "INSERT INTO folders(uuid, user_uuid, title, status) VALUES (?, ?, ?, ?)";
            console.log('Params:', uuid, user_uuid, title, status);
            const params: any[] = [uuid, user_uuid, title, status];
            const [result]: any = await query(sql, params);
            // Ajusta la creación de la instancia Note según los campos de la tabla
            return new Folder(uuid, user_uuid, title, status);
        } catch (error) {
            console.error("Error adding folders:", error);
            return error as Error;
        }
    }

    async updateFolder(uuid: string, title: string): Promise<string | Folder | Error | null> {
        try {
            // Primero, obtén los valores actuales de la nota
            const selectSql = "SELECT * FROM folders WHERE uuid = ?";
            const selectParams: any[] = [uuid];
            const [selectResult]: any = await query(selectSql, selectParams);

            // Verifica si la nota existe
            if (selectResult.length === 0) {
                return null; // La nota no existe
            }

            // Recupera los valores actuales
            const currentNote = selectResult[0];

            // Luego, realiza la actualización del campo 'title'
            const updateSql = "UPDATE folders SET title = ? WHERE uuid = ?";
            const updateParams: any[] = [title, uuid];
            const [updateResult]: any = await query(updateSql, updateParams);

            // Verifica si se actualizó alguna fila en la base de datos
            if (updateResult.affectedRows > 0) {
                // Si se actualizó, crea una nueva instancia de Note con los valores actuales
                // excepto por el campo 'title' que se actualiza
                return new Folder(
                    currentNote.uuid,
                    currentNote.user_uuid,
                    title,
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
    async deleteFolder(uuid: string): Promise<string | Folder | Error | null> {
        try {
            // Elimina la nota de la base de datos
            const deleteSql = "DELETE FROM folders WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            const [deleteResult]: any = await query(deleteSql, deleteParams);

            // Verifica si se eliminó alguna fila en la base de datos
            if (deleteResult.affectedRows > 0) {
                return "La carpeta se ha eliminado correctamente.";
            } else {
                // Si no se eliminó ninguna fila, el UUID podría no existir en la tabla
                return "La carpeta con el UUID especificado no existe.";
            }
        } catch (error) {
            console.error("Error deleting folder:", error);
            return error as Error;
        }
    }
    async getFolderByUser(user_uuid: string): Promise<string | Folder[] | Error | null> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM folders WHERE user_uuid = ?";
            const params: any[] = [user_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const notes = result.map((row: any) => {
                    return new Folder(
                        row.uuid,
                        row.user_uuid,
                        row.title,
                        row.status
                    );
                });

                return notes;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving folders by user:", error);
            return error as Error;
        }        
    }
}