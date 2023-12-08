import { error } from "console";
import { query } from "../../database/connection";
import { Activity, Mark, MarkDescription, UserOwner } from "../domain/mark";
import { IMarkRepository } from "../domain/markRepository";
import { RowDataPacket } from "mysql2";


export class MysqlMarkRepository implements IMarkRepository {
  
    
    async createMark(
        uuid: string,
        latitude: number,
        longitude: number,
        description: string,
        endDate: string,
        urlImage: string,
        userUuid: string,
        activityUuid: string
    ): Promise<string | null | Mark | Error> {

        try {
            let sql = "INSERT INTO pines(uuid, location, description, create_date, end_date, url_image, user_uuid, activity_uuid) VALUES (?, POINT(?, ?), ?, UTC_TIMESTAMP(), ADDDATE(UTC_TIMESTAMP(), INTERVAL ? HOUR_MINUTE), ?, ?, ?)";
            const params: any[] = [uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid];
            const [result]: any = await query(sql, params);
            // Si necesitas devolver algo, puedes hacerlo aquí
            return result;
        } catch (error) {
            throw error;
        }
    }
    async listMarks(
        userLatitude: number, 
        userLongitude: number
    ): Promise<string[] | null> {
        try {
            let sql = `
            SELECT p.uuid, 
            ST_X(p.location) AS latitude, 
            ST_Y(p.location) AS longitude, 
            p.description, 
            p.create_date, 
            p.end_date, 
            p.url_image, 
            p.user_uuid, 
            p.activity_uuid,
            (ST_Distance_Sphere(
                POINT(ST_Y(p.location), ST_X(p.location)), 
                POINT(?, ?)
            ) / 1000) AS distance_km
        FROM pines p
        WHERE p.end_date > NOW()
        HAVING distance_km <= 4;     
            `;
                const [result]: any = await query(sql, [userLongitude, userLatitude]);
            console.log("aquipaaa")
            console.log(result)
            console.log("aquipaaa")

            if (!result) {
                return null;
            }
    
            // Asegurarse de que result es tratado como RowDataPacket[]
            const rows = result as RowDataPacket[];
            //  const userUuids = rows.map(pin => pin.user_uuid);
    
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    

    async userAsist(uuid: string, markUuid: string, userUuid: string, latitude: number, longitude: number): Promise<string | null | Error> {
        try {


            const checkAttendanceSql = "SELECT * FROM assists WHERE user_uuid = ? AND pin_uuid = ?";
            const checkAttendanceParams = [userUuid, markUuid];
            const [attendanceResult]: any = await query(checkAttendanceSql, checkAttendanceParams);
            if (attendanceResult.length > 0) {
                
                throw Error("El usuario ya ha asistido");
            }
    
            const sql = `SELECT ST_X(location) AS latitude, ST_Y(location) AS longitude FROM pines WHERE uuid = ?`;
            const params = [markUuid];
            const [[locationResult]]: any = await query(sql, params);
            const checkDistanceSql = `
            SELECT ST_Distance_Sphere(
                POINT(?, ?), 
                POINT(?, ?)
            ) AS distance
            `;
            const checkParams = [longitude, latitude, locationResult.longitude, locationResult.latitude];
            const [[distanceResult]]: any = await query(checkDistanceSql, checkParams);

            if (distanceResult.distance <= 500) {
                // Realizar la inserción si el usuario está dentro del rango permitido
                const insertSql = "INSERT INTO assists (uuid, attended_at, pin_uuid, user_uuid) VALUES (?, UTC_TIMESTAMP(), ?, ?);";
                const insertParams: any[] = [uuid, markUuid, userUuid];
                await query(insertSql, insertParams);
                return "exitoso";
            } else {
                // El usuario no está dentro del rango permitido
                throw Error('Hacercate un poco mas');
            }

        
        } catch (error) {

            throw error;
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
    
    async addActivity(uuid: string, name: string, imgUrl: string): Promise<string | Error | Activity | null> {
        try {
            console.log("aqui")
            let sql = "INSERT INTO activitys(uuid, name, url_image) VALUES (?,?,?)";
            console.log("aqui")
            const params: any[] = [uuid, name, imgUrl];
            console.log("aqui")

            const [rsult]: any = await  query(sql,params);
            return new Activity(uuid,name,imgUrl);      
        } catch (error) {
            console.error("Error adding activity:", error);
            return null;
        }
        }
        

        async addOwnerMarks(owners: any[], marks: UserOwner[]): Promise<MarkDescription[] | null> {
            try {
        
                // Verificar que ambos arreglos tienen la misma longitud
                if (owners.length !== marks.length) {
                    console.error('Los arreglos owners y marks tienen longitudes diferentes.');
                    return null;
                }
        
                const markDescriptionsPromises: Promise<MarkDescription>[] = owners.map(async (owner, index) => {
                    const userOwner = marks[index]; // Obtener el correspondiente UserOwner basado en el índice
        
                    const sql = "SELECT uuid, name, url_image FROM activitys WHERE uuid = ?";
                    const [activity]: any = await query(sql, [owner.activity_uuid]);
                    
        
                    return new MarkDescription(
                        owner.uuid,
                        owner.latitude,
                        owner.longitude,
                        owner.description,
                        owner.create_date,
                        owner.end_date,
                        owner.url_image,
                        owner.user_uuid,
                        owner.activity_uuid,
                        [userOwner], // Envolver en un arreglo
                        activity[0]
                    );
                });
        
                return await Promise.all(markDescriptionsPromises);
            } catch (error) {
                console.error('Error en addOwnerMarks:', error);
                throw error;
            }
        }
        
        
        
        

}