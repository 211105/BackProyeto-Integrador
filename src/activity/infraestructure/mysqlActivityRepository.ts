import { url } from "inspector";
import { Activity } from "../domain/activity";
import { IActivityRepository } from "../domain/activityRepository";
import { query } from "../../database/connection";



export class MysqlActivityRepository implements IActivityRepository {
    async addActivity(uuid: string, name: string, imgUrl: string): Promise<string | Error | Activity | null> {
    try {
        let sql = "INSERT INTO activitys(uuid, name, url_image) VALUES (?,?,?)";
        const params: any[] = [uuid, name, imgUrl];
        const [rsult]: any = await  query(sql,params);
        return new Activity(uuid,name,imgUrl);      
    } catch (error) {
        console.error("Error adding activity:", error);
        return null;
    }
    }
    async deleteActivity(uuid: string): Promise<string | null> {
        try {
            let sql = "DELETE FROM activitys WHERE uuid = ?";
            const params: any = [uuid]
            const [rsult]: any = await  query(sql,params);
            return rsult;
        } catch (error) {
            return `${error}`
        }
       
    }
 
    async updateActivity(uuid: string, name?: string, imgUrl?: string): Promise<string | null> {
        // Inicializa un objeto para almacenar las actualizaciones.
        const updates: { [key: string]: string } = {};
    
        // Agrega los valores al objeto de actualizaciones solo si no son undefined.
        if (name !== undefined) updates.name = name;
        if (imgUrl !== undefined) updates.imgUrl = imgUrl;
    
        // Verifica si hay algo que actualizar.
        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.
    
        // Construye la parte de asignación de la consulta SQL.
        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE activitys SET ${sqlParts.join(', ')} WHERE uuid = ?`;
    
        try {
            // Prepara los valores para la consulta.
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
    
            // Ejecuta la consulta SQL.
            await query(sql, values);
    
            // Retorna un mensaje de éxito.
            return "Actividad actualizada con éxito";
        } catch (error) {
            console.error('Error updating activity:', error);
            // Devuelve el error como un string o maneja de otra manera.
            return `Error al actualizar la actividad: ${error}`;
        }
    }
    
    
    async listActyvitiys(): Promise<Activity[] | null> {
        try {
            // Completa la sentencia SQL para seleccionar los datos necesarios
            const sql = "SELECT uuid, name, url_image FROM activitys"; // Asegúrate de que los nombres de columna coincidan con tu base de datos
            const [results]: any = await query(sql);
    
            // Convertir cada fila del resultado en una instancia de Activity
            const activities = results.map((row: any) => new Activity(row.uuid, row.name, row.url_image));
    
            return activities;
        } catch (error) {
            // Manejar el error, tal vez registrarlo o devolver un valor diferente si es necesario
            return null;
        }
    }
    
}