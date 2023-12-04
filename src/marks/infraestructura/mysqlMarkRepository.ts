import { error } from "console";
import { query } from "../../database/connection";
import { Activity, MarkDescription } from "../domain/mark";
import { IMarkRepository } from "../domain/markRepository";


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
    ): Promise<string | null> {

        try {
            let sql = "INSERT INTO pines(uuid, location, description, create_date, end_date, url_image, user_uuid, activity_uuid) VALUES (?, POINT(?, ?), ?, UTC_TIMESTAMP(), ADDDATE(UTC_TIMESTAMP(), INTERVAL ? HOUR_MINUTE), ?, ?, ?)";
            const params: any[] = [uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid];
            const [result]: any = await query(sql, params);
            // Si necesitas devolver algo, puedes hacerlo aquí
            return result;
        } catch (error) {
            console.log(error)
            return `${error}`
        }
    }
    async listMarks(
        userLatitude: number, 
        userLongitude: number
        ): Promise<MarkDescription[] | null | string> {
        try {
            // Primero, obtenemos todos los datos básicos de los pines
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
            const result = await query(sql, [userLongitude, userLatitude]);
            if (!result) {
                return null;
            }
            const [pines]: any[] = result;
            // Para cada pin, obtenemos los datos adicionales de UserOwner, UserAsist y Activity
            for (const pin of pines) {
                    //desde la api
                // Obtener UserOwner
                sql = "SELECT uuid, name, img_url AS urlImage FROM users WHERE uuid = ?";
                const [userOwner]: any = await query(sql, [pin.user_uuid]);
                pin.userOwners = userOwner;
                    //pasar como endpoit a la api de usuarios
                // Obtener UserAsist
                sql = "SELECT u.uuid, u.name, u.img_url AS urlImage FROM users u JOIN assists a ON u.uuid = a.user_uuid WHERE a.pin_uuid = ?";
                const [userAsists]: any = await query(sql, [pin.uuid]);
                pin.userAsists = userAsists;
    
                // Obtener Activity
                sql = "SELECT uuid, name, url_image FROM activitys WHERE uuid = ?";
                const [activity]: any = await query(sql, [pin.activity_uuid]);
                pin.infoActivity = activity[0];
            }
            console.log(pines);
            // Convertir cada pin a un objeto MarkDescription
            const marks = pines.map((pin: any) => new MarkDescription(
                pin.uuid,
                pin.latitude,
                pin.longitude,
                pin.description,
                pin.create_date, 
                pin.end_date,    
                pin.url_image,   
                pin.user_uuid,  
                pin.activity_uuid, 
                pin.userOwners,  
                pin.userAsists,  
                pin.infoActivity    
            ));
            
    
            return marks;
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
            return error as Error ;
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
            let sql = "INSERT INTO activitys(uuid, name, url_image) VALUES (?,?,?)";
            const params: any[] = [uuid, name, imgUrl];
            const [rsult]: any = await  query(sql,params);
            return new Activity(uuid,name,imgUrl);      
        } catch (error) {
            console.error("Error adding activity:", error);
            return null;
        }
        }
    

}