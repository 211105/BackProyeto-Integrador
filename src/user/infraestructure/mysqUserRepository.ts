import { query } from "../../database/connection";
import { ResponseLogin, User,ResponseLoginAllUsers } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";
import { isEmailRegistered } from "./validation/usermysql";
import deleteFromFirebase from "../../helpers/deleteImage";

export class MysqlUserRepository implements IUsuarioRepository {
    

    async registerUser(uuid: string, name: string, email: string, phone_number: string, img_url: string, password: string,type_user:string): Promise<User | null | string | Error> {
      
        try {
            // const hashPassword = await encrypt(password)
            
            await isEmailRegistered(email)
           
            let sql = "INSERT INTO users(uuid, name, email, phone_number , password, img_url,type_user) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, email, phone_number, password, img_url,type_user];
            const [result]: any = await query(sql, params);
            return new User(uuid, name, email, phone_number, img_url , password,type_user);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async loginUser(email: string, password: string): Promise<ResponseLoginAllUsers | string | null> {
        try {
            // Buscar en la tabla 'users'
            const [users]: any = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    
            if (users && users.length > 0) {
                const user = users[0];
                const passwordMatches = await compare(password, user.password);
    
                if (passwordMatches) {
                    const token: string = tokenSigIn(user.uuid, user.email);
                    const responseLogin: ResponseLoginAllUsers = new ResponseLoginAllUsers(user, token);
    
                    return responseLogin;
                }
            }
    
            // Si no se encontró en 'users', buscar en la tabla 'owner'
            const [owners]: any = await query('SELECT * FROM owners WHERE email = ? LIMIT 1', [email]);
    
            if (owners && owners.length > 0) {
                const owner = owners[0];
                // Procesar el usuario de la tabla 'owner' y agregarlo a data_users
                // ...
    
                const token: string = tokenSigIn(owner.uuid, owner.email);
                const responseLogin: ResponseLoginAllUsers = new ResponseLoginAllUsers(owner, token);
    
                return responseLogin;
            }
    
            // Si no se encontró en 'owner', buscar en la tabla 'driver'
            const [drivers]: any = await query('SELECT * FROM drivers WHERE email = ? LIMIT 1', [email]);
    
            if (drivers && drivers.length > 0) {
                const driver = drivers[0];
                // Procesar el usuario de la tabla 'driver' y agregarlo a data_users
                // ...
    
                const token: string = tokenSigIn(driver.uuid, driver.email);
                const responseLogin: ResponseLoginAllUsers = new ResponseLoginAllUsers(driver, token);
    
                return responseLogin;
            }
    
            // Si no se encontró en ninguna tabla, devolver null
            return null;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

 

    async updateUserById(uuid: string, name?: string, phone_number?: string, email?: string, img_url?:string): Promise<User | null> {
        const updates: { [key: string]: string } = {};
        console.log(img_url)
        if (name !== undefined) updates.name = name;
        if (phone_number !== undefined) updates.phone_number = phone_number;
        if (email !== undefined) updates.email = email;
        if (img_url !== undefined) {
            updates.img_url = img_url
        } 


        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;        
        try {
            const [imgUrlUser]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            console.log("imagen que se eliminara",imgUrlUser[0].img_url)
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }
            await deleteFromFirebase(imgUrlUser[0].img_url)
            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].email,
                updatedRows[0].phone_number,
                updatedRows[0].img_url,
                "",
                updatedRows[0].type_user
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

    }

    async updatePassword(uuid: string, password: string): Promise<User | null> {
        try {
            // Asumiendo que 'password' ya está cifrado.
            const hashPassword = await encrypt(password)
            const sql = 'UPDATE users SET password = ? WHERE uuid = ?';
            const result: any = await query(sql, [hashPassword, uuid]);

            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].last_name,
                updatedRows[0].phone_number,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].type_user,
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }


  



}