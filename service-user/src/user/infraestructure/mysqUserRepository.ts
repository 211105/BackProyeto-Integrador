import { query } from "../../database/connection";
import { ResponseLogin, User,ResponseLoginAllUsers, UserOwner } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { compare, encrypt } from '../../helpers/ashs';
import { tokenSigIn } from "../../helpers/token";


export class MysqlUserRepository implements IUsuarioRepository {


        async registerUser(uuid: string, name: string, email: string, phone_number: string, img_url: string, password: string,type_user:string): Promise<User | null | string | Error> {
        
            try {
                
                let sql = "INSERT INTO users(uuid, name, email, phone_number , password, img_url, type_user) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const params: any[] = [uuid, name, email, phone_number, password, img_url,type_user];

                const [result]: any = await query(sql, params);
                console.log("soy el resultado",result)

                return new User(uuid, name, email, phone_number, img_url , password,type_user);
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
            // await deleteFromFirebase(imgUrlUser[0].img_url)cc
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
        }}

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

}