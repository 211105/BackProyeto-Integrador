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
        try {
        
            let updates = [];
            const params: any = [];
    
            if (name) {
                updates.push("name = ?");
                params.push(name);
            }
    
            if (imgUrl) {
                updates.push("imgUrl = ?");
                params.push(imgUrl);
            }
    
            let sql = `UPDATE activitys SET ${updates.join(", ")} WHERE uuid = ?`;
            params.push(uuid);
    
            // Ejecutar la consulta SQL
            const [result]: any = await query(sql, params);
    
            // Devolver un mensaje de éxito
            return "Actividad actualizada con éxito";
        } catch (error) {
            // Devolver el error como un string
            return `${error}`;
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