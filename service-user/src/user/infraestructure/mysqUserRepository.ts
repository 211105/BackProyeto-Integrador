import { query } from "../../database/connection";
import { ResponseLogin, User, ResponseLoginAllUsers, UserOwner } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";


export class MysqlUserRepository implements IUsuarioRepository {


    async registerUser(uuid: string, name: string, email: string, phone_number: string, img_url: string, password: string, type_user: string): Promise<User | null | string | Error> {


        try {

            const checkEmailSql = `
                SELECT COUNT(*) as emailCount
                FROM users
                WHERE email = ?;
                `;

            const [emailResults]: any = await query(checkEmailSql, [email]);
            if (emailResults[0].emailCount > 0) {
                throw new Error("El correo electrónico ya está registrado en la base de datos.");
            }

            let sql = "INSERT INTO users(uuid, name, email, phone_number , password, img_url, type_user) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, email, phone_number, password, img_url, type_user];

            const [result]: any = await query(sql, params);
            console.log("soy el resultado", result)

            return new User(uuid, name, email, phone_number, img_url, password, type_user);
        } catch (error) {
            console.error("Error adding:", error);
            throw error;
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
            // Si no se encontró en ninguna tabla, devolver null
            return null;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }


    async updateUserById(uuid: string, name: string, email: string, phone_number: string): Promise<User | null> {
        try {
            // Verificar si el correo electrónico ya existe en la base de datos
            const [existingUser]: any = await query('SELECT * FROM users WHERE email = ? AND uuid <> ?', [email, uuid]);

            if (existingUser && existingUser.length > 0) {
                throw new Error('Correo electrónico ya existe en la base de datos.');
            }

            const updates: { [key: string]: string } = {
                name,
                phone_number,
                email,
            };

            const keys = Object.keys(updates);
            const values = keys.map(key => updates[key]);

            if (keys.length === 0) {
                return null; // No hay nada que actualizar.
            }

            const sqlParts = keys.map(key => `${key} = ?`);
            const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;

            // Añade el UUID al final del array de valores.
            values.push(uuid);

            // Ejecuta la consulta SQL.
            await query(sql, values);

            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }

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
            throw error;
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
    async getUserByUuid(uuid: string): Promise<User | null> {
        try {
            const [rows]: any = await query('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]);

            if (rows && rows.length > 0) {
                const user = rows[0];
                return new User(
                    user.uuid,
                    user.name,
                    user.email,
                    user.phone_number,
                    user.img_url,
                    "",
                    user.type_user
                );
            }
            return null;
        } catch (error) {
            console.error('Error getting user by UUID:', error);
            throw error;
        }
    }

    async getUserOwners(userOwners: string[]): Promise<UserOwner[]> {
        try {
            // Array para almacenar los resultados
            let owners: UserOwner[] = [];

            // Para cada UUID en userOwners, obtenemos los datos del usuario
            for (const uuid of userOwners) {
                let sql = "SELECT uuid, name, img_url AS urlImage FROM users WHERE uuid = ?";
                const [userOwner]: any = await query(sql, [uuid]);


                if (userOwner && userOwner.length > 0) {
                    owners.push(userOwner[0]); // Asumiendo que la consulta devuelve un único resultado por UUID
                }
            }
            return owners;
        } catch (error) {
            console.error(error);
            return [];
        }

    }
    async updateImgUrl(uuid: string, img_url: string): Promise<User | Error | null> {
        try {
            // Verificar si el usuario existe en la base de datos
            const [existingUser]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);

            if (!existingUser || existingUser.length === 0) {
                throw new Error('No se encontró ningún usuario con el UUID proporcionado.');
            }

            // Actualizar el atributo img_url
            await query('UPDATE users SET img_url = ? WHERE uuid = ?', [img_url, uuid]);

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No se pudo obtener el usuario actualizado.');
            }

            // Crear y devolver el objeto de usuario actualizado
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
            console.error('Error updating user image URL:', error);
            throw error;
        }
    }

}