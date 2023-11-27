import { query } from "../../../database/connection";
import { Comment } from "../domain/comment";
import { CommentRepository } from "../domain/commentRepository";

export class MysqlCommentRepository implements CommentRepository{
    async createComment(uuid: string, user_uuid: string, driver_uuid: string, rating: number, commet_text: string, status: boolean): Promise<string | Error | Comment | null> {
        try {
            let sql = "INSERT INTO comments(uuid,user_uuid,driver_uuid,rating,commet_text,status) VALUES(?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid,user_uuid,driver_uuid,rating,commet_text,status];
            const [result]: any = await query(sql, params);
            return new Comment(uuid,user_uuid,driver_uuid,rating,commet_text,status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    async getCommentsByDriver(driver_uuid: string): Promise<string | Error | Comment[] | null> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM comments WHERE driver_uuid = ?";
            const params: any[] = [driver_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const comments = result.map((row: any) => {
                    return new Comment(
                        row.uuid,
                        row.user_uuid,
                        row.driver_uuid,
                        row.rating,
                        row.commet_text,
                        row.status,
                    );
                });

                return comments;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving files by user:", error);
            return error as Error;
        }
    }
    async getRatingDriver(driver_uuid: string): Promise<number | string | Error | null> {
        try {
            // Obtener todos los comentarios asociados al conductor
            const commentsResult = await this.getCommentsByDriver(driver_uuid);
    
            // Verificar si se obtuvieron comentarios
            if (Array.isArray(commentsResult)) {
                const comments = commentsResult as Comment[];
    
                // Verificar si hay al menos un comentario
                if (comments.length > 0) {
                    // Filtrar los comentarios que tienen un valor numérico en rating
                    const validComments = comments.filter(comment => typeof comment.rating === 'number' || !isNaN(parseFloat(comment.rating as string)));
    
                    // Verificar si hay comentarios válidos antes de realizar la operación
                    if (validComments.length > 0) {
                        // Calcular la suma de calificaciones
                        const sumaCalificaciones = validComments.reduce((total, comment) => total + parseFloat(comment.rating as string), 0);
    
                        // Calcular el promedio
                        const calificacionPromedio = sumaCalificaciones / validComments.length;
    
                        // Devolver el promedio como un número decimal
                        return calificacionPromedio;
                    } else {
                        // Si no hay comentarios válidos, devuelve 0 o algún valor predeterminado
                        return 0;
                    }
                } else {
                    // Si no hay comentarios, devuelve 0 o algún valor predeterminado
                    return 0;
                }
            } else {
                // Si hubo un error al obtener comentarios, devuelve el error
                return commentsResult;
            }
        } catch (error) {
            console.error("Error retrieving driver rating:", error);
            return error as Error;
        }
    }
}