import { query } from "../../database/connection";
import { Driver,ResonseLogin } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";


export class MysqlDriverRepository implements DriverRepository {
    async registerDriver(uuid: string, name: string, surname: string, second_surname: string, email: string, password: string, url_photography: string, identification_number: string, url_identification: string, phone: string, status: boolean): Promise<Driver | null | Error> {
        try {

            let sql = "INSERT INTO drivers(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status];
            const [result]: any = await query(sql, params);
            return new Driver(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    async loginDriver(email: string, password: string): Promise<ResonseLogin  |string | null> {
        try {
            // Primero, obtener el usuario por email.
            const [drivers]: any = await query('SELECT * FROM drivers WHERE email = ? LIMIT 1', [email]);
          
            if (!drivers || drivers.length === 0) {
                return null
            }

            const driver = drivers[0];
            console.log(driver)
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
            const passwordMatches = await compare(password, driver.password); //pasar a la parte 
          

            if (!passwordMatches) {
                return 'Unauthorized'
            }
            const token:string = tokenSigIn(driver.uuid,driver.email)

            const dataUser: ResonseLogin = new ResonseLogin(
                driver.uuid,
                driver.name,
                driver.surname,
                driver.second_surname,
                driver.email,
                driver.url_photography,
                driver.identification_number,
                driver.url_identification,
                driver.phone,
                driver.status,
                token
            )
           
            return dataUser;

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}