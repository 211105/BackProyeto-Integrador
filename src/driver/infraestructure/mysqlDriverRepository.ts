import { query } from "../../database/connection";
import { Driver } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { isEmailRegistered } from "./validations/drivermysql";


export class MysqlDriverRepository implements DriverRepository {
    async registerDriver(uuid: string, name: string, surname: string, second_surname: string, email: string, password: string, url_photography: string, identification_number: string, url_identification: string, phone: string, status: boolean): Promise<Driver | null | Error> {
        try {
            await isEmailRegistered(email);
            
            let sql = "INSERT INTO drivers(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status];
            const [result]: any = await query(sql, params);
            return new Driver(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
}