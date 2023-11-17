import { query } from "../../../database/connection";
import { Driver,ResonseLogin } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { compare, encrypt } from '../../../helpers/ashs';
import { tokenSigIn } from "../../../helpers/token";


export class MysqlDriverRepository implements DriverRepository {
    async registerDriver(uuid: string, name: string, surname: string, second_surname: string, email: string, password: string, url_photography: string, identification_number: string, url_identification: string, phone: string, status: boolean,status_identity:boolean,status_moto_selection:boolean,owner_uuid:string): Promise<Driver | null | Error> {
        try {

            let sql = "INSERT INTO drivers(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status,status_identity, status_moto_selection,owner_uuid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?)";
            const params: any[] = [uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status,status_identity,status_moto_selection,owner_uuid];
            const [result]: any = await query(sql, params);
            return new Driver(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status,status_identity,status_moto_selection,owner_uuid);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
}