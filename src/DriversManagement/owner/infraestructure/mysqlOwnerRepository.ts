import { query } from "../../../database/connection";
import { Owner } from "../domain/owner";
import { OwnerRepository } from "../domain/ownerRepostitory";

export class MysqlOwnerRepository implements OwnerRepository{
    async registerOwner(uuid: string, name: string, surname: string, second_surname: string, email: string, password: string, phone_number: string, img_url: string, type_user: string, status: boolean): Promise<Owner | null | Error | string> {
        try {
            let sql = "INSERT INTO owners (uuid, name, surname, second_surname, email, password, phone_number,img_url,type_user,status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, surname, second_surname, email, password, phone_number, img_url, type_user, status];
            const [result]: any = await query(sql, params);
            return new Owner(uuid, name, surname, second_surname, email, password, phone_number, img_url, type_user, status);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }

    async updateOwner(uuid: string, name?: string, surname?: string, second_surname?: string, email?: string , phone_number?: string): Promise<Owner | null> {
        const updates: { [key: string]: string } = {};
        if (name !== undefined) updates.name = name;
        if (surname !== undefined) updates.surname = surname;
        if (second_surname !== undefined) updates.second_surname = second_surname;
        if (email !== undefined) updates.email = email;
        if (phone_number !== undefined) updates.phone_number = phone_number;


        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE owners SET ${sqlParts.join(', ')} WHERE uuid = ?`;        
        try {
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM owners WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }
            const updatedOwner = new Owner(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].surname,
                updatedRows[0].second_surname,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].phone_number,
                updatedRows[0].img_url,
                updatedRows[0].type_username,
                updatedRows[0].status,
                
            );
            return updatedOwner;

        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    async deleteOwnner(uuid: string): Promise<string | Owner | null> {
        try {
            const sql = 'DELETE FROM owners WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0){
                return null;
            } 

            return 'Owner deleted successfully.';
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
}