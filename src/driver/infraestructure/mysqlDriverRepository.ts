import { query } from "../../database/connection";
import { Driver, ResonseLogin } from "../domain/driver";
import { DriverRepository } from "../domain/driverRepository";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";
import deleteFromFirebase from "../../helpers/deleteImage";



export class MysqlDriverRepository implements DriverRepository {
    async registerDriver(uuid: string, name: string, surname: string, second_surname: string, email: string, password: string, url_photography: string, identification_number: string, url_identification: string, phone: string, status: boolean, status_identity: boolean, status_moto_selection: boolean, owner_uuid: string, type_user: string): Promise<Driver | null | Error> {
        try {

            let sql = "INSERT INTO drivers(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status,status_identity,status_moto_selection ,owner_uuid, type_user) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status, status_identity, status_moto_selection, owner_uuid, type_user];
            const [result]: any = await query(sql, params);
            return new Driver(uuid, name, surname, second_surname, email, password, url_photography, identification_number, url_identification, phone, status, status_identity, status_moto_selection, owner_uuid, type_user);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async loginDriver(email: string, password: string): Promise<ResonseLogin | string | null> {
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
            const token: string = tokenSigIn(driver.uuid, driver.email)

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
    async updatePassword(uuid: string, password: string): Promise<Driver | null> {
        try {
            // Asumiendo que 'password' ya está cifrado.
            const hashPassword = await encrypt(password)
            const sql = 'UPDATE drivers SET password = ? WHERE uuid = ?';
            const result: any = await query(sql, [hashPassword, uuid]);

            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new Driver(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].surname,
                updatedRows[0].second_surname,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].url_photography,
                updatedRows[0].identification_number,
                updatedRows[0].url_identification,
                updatedRows[0].phone,
                updatedRows[0].status,
                updatedRows[0].status_identity,
                updatedRows[0].status_moto_selection,

                updatedRows[0].owner_uuid,

                updatedRows[0].type_user,




            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    async validateIdentity(uuid: string, url_identification: string): Promise<string | Driver | Error | null> {
        try {
            // Actualizar el campo status_identity y url_identification
            const sql = 'UPDATE drivers SET status_identity = ?, url_identification = ? WHERE uuid = ?';
            const result: any = await query(sql, [true, url_identification, uuid]);

            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) {
                return null;
            }

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) {
                return null;
            }

            const updatedUser = new Driver(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].surname,
                updatedRows[0].second_surname,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].url_photography,
                updatedRows[0].identification_number,
                updatedRows[0].url_identification,
                updatedRows[0].phone,
                updatedRows[0].status,
                updatedRows[0].status_identity,
                updatedRows[0].status_moto_selection,
                updatedRows[0].owner_uuid,
                updatedRows[0].type_user
            );

            return updatedUser;
        } catch (error) {
            console.error('Error during identity validation:', error);
            throw error;
        }
    }

    async updateDriver(uuid: string, email?: string, url_photography?: string, phone?: string): Promise<string | Driver | Error | null> {
        const updates: { [key: string]: string } = {};

        if (email !== undefined) updates.email = email;
        if (url_photography !== undefined) updates.url_photography = url_photography;
        if (phone !== undefined) updates.phone = phone;

        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE drivers SET ${sqlParts.join(', ')} WHERE uuid = ?`;

        try {
            const [driverData]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [uuid]);
            if (!driverData || driverData.length === 0) {
                throw new Error('No driver found with the provided UUID.');
            }

            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.

            const [updatedRows]: any = await query('SELECT * FROM drivers WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No driver found with the provided UUID after update.');
            }

            // Si se proporciona una nueva URL de fotografía, eliminar la antigua
            if (url_photography !== undefined && driverData[0].url_photography) {
                await deleteFromFirebase(driverData[0].url_photography);
            }

            const updatedDriver = new Driver(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].surname,
                updatedRows[0].second_surname,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].url_photography,
                updatedRows[0].identification_number,
                updatedRows[0].url_identification,
                updatedRows[0].phone,
                updatedRows[0].status,
                updatedRows[0].status_identity,
                updatedRows[0].status_moto_selection,
                updatedRows[0].owner_uuid,
                updatedRows[0].type_user
            );

            return updatedDriver;
        } catch (error) {
            console.error('Error updating driver:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }

    async getDriversByOwner(owner_uuid: string): Promise<Driver[] | Error | null | Error> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM drivers WHERE owner_uuid = ?";
            const params: any[] = [owner_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const notes = result.map((row: any) => {
                    return new Driver(
                        row.uuid,
                        row.name,
                        row.surname,
                        row.second_surname,
                        row.email,
                        row.password,
                        row.url_photography,
                        row.identification_number,
                        row.url_identification,
                        row.phone,
                        row.status,
                        row.status_identity,
                        row.status_moto_selection,
                        row.owner_uuid,
                        row.type_user,
                    );
                });

                return notes;
            } else {
                // Si no hay resultados, devuelve un array vacío
                return [];
            }
        } catch (error) {
            console.error("Error retrieving files by user:", error);
            return error as Error;
        }
    }
    
    async deleteDriver(uuid: string): Promise<string | Driver | Error | null> {
        try {
            // Obtén la información del conductor antes de eliminarlo
            const [driverData]: any = await query('SELECT url_photography, url_identification FROM drivers WHERE uuid = ?', [uuid]);
    
            if (!driverData || driverData.length === 0) {
                return "El conductor con el UUID especificado no existe.";
            }
    
            // Elimina la nota de la base de datos
            const deleteSql = "DELETE FROM drivers WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            const [deleteResult]: any = await query(deleteSql, deleteParams);
    
            // Verifica si se eliminó alguna fila en la base de datos
            if (deleteResult.affectedRows > 0) {
                // Elimina las imágenes asociadas
                if (driverData[0].url_photography) {
                    await deleteFromFirebase(driverData[0].url_photography);
                }
                if (driverData[0].url_identification) {
                    await deleteFromFirebase(driverData[0].url_identification);
                }
    
                return "El conductor y sus archivos asociados se han eliminado correctamente.";
            } else {
                // Si no se eliminó ninguna fila, el UUID podría no existir en la tabla
                return "El conductor con el UUID especificado no existe.";
            }
        } catch (error) {
            console.error("Error deleting driver:", error);
            return error as Error;
        }
    }
    
}