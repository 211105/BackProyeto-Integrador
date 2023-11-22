import { query } from "../../../database/connection";
import { Vehicle } from "../domain/vehicle";
import { VehicleRepository } from "../domain/vehicleRepository";
import deleteFromFirebase from "../../../helpers/deleteImage";




export class MysqlVehicleRepository implements VehicleRepository{

    async registerVehicle(uuid: string, brand: string, model: string, plate_number: string, name_association: string, vin: string, url_img: string, owner_uuid: string, status: boolean, status_driver_selection:boolean): Promise<string | Vehicle | null | Error> {
        try {
            let sql = "INSERT INTO vehicles (uuid,brand,model,plate_number,name_association,vin,url_img,owner_uuid,status, status_driver_selection) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const params: any[] = [uuid,brand,model,plate_number,name_association,vin,url_img,owner_uuid,status, status_driver_selection];
            const [result]: any = await query(sql, params);
            return new Vehicle(uuid,brand,model,plate_number,name_association,vin,url_img,owner_uuid,status, status_driver_selection);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }  
    }
    async updateVehicleByUuid(uuid: string, brand?: string, model?: string, plate_number?: string, name_association?: string, vin?: string, url_img?: string): Promise<string | Vehicle | Error | null> {
        const updates: { [key: string]: string } = {};
    
        if (brand !== undefined) updates.brand = brand;
        if (model !== undefined) updates.model = model;
        if (plate_number !== undefined) updates.plate_number = plate_number;
        if (name_association !== undefined) updates.name_association = name_association;
        if (vin !== undefined) updates.vin = vin;
        if (url_img !== undefined) updates.url_img = url_img;
    
        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.
    
        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE vehicles SET ${sqlParts.join(', ')} WHERE uuid = ?`;
    
        try {
            const [vehicleData]: any = await query('SELECT * FROM vehicles WHERE uuid = ?', [uuid]);
            if (!vehicleData || vehicleData.length === 0) {
                throw new Error('No vehicle found with the provided UUID.');
            }
    
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
    
            const [updatedRows]: any = await query('SELECT * FROM vehicles WHERE uuid = ?', [uuid]);
    
            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No vehicle found with the provided UUID after update.');
            }
    
            // Si se proporciona una nueva URL de imagen, eliminar la antigua
            if (url_img !== undefined && vehicleData[0].url_img) {
                await deleteFromFirebase(vehicleData[0].url_img);
            }
    
            const updatedVehicle = new Vehicle(
                updatedRows[0].uuid,
                updatedRows[0].brand,
                updatedRows[0].model,
                updatedRows[0].plate_number,
                updatedRows[0].name_association,
                updatedRows[0].vin,
                updatedRows[0].url_img,
                updatedRows[0].owner_uuid,
                updatedRows[0].status,
                updatedRows[0].status_driver_selection
            );
    
            return updatedVehicle;
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    async getVehicleByOwner (owner_uuid: string): Promise<Vehicle[] | Error | null | Error> {
        try {
            // Selecciona todas las notas del usuario con url_file no vacío o null
            const sql = "SELECT * FROM vehicles WHERE owner_uuid = ?";
            const params: any[] = [owner_uuid];
            const [result]: any = await query(sql, params);

            // Verifica si se obtuvieron resultados
            if (result.length > 0) {
                // Mapea los resultados para crear instancias de Note
                const notes = result.map((row: any) => {
                    return new Vehicle(
                        row.uuid,
                        row.brand,
                        row.model,
                        row.plate_number,
                        row.name_association,
                        row.vin,
                        row.url_img,
                        row.owner_uuid,
                        row.status,
                        row.status_driver_selection,
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

    async deleteVehicle(uuid: string): Promise<string | Vehicle | Error | null> {
        try {
            // Obtén la información del conductor antes de eliminarlo
            const [driverData]: any = await query('SELECT url_img FROM vehicles WHERE uuid = ?', [uuid]);
    
            if (!driverData || driverData.length === 0) {
                return "El vehiculo con el UUID especificado no existe.";
            }
    
            // Elimina la nota de la base de datos
            const deleteSql = "DELETE FROM vehicles WHERE uuid = ?";
            const deleteParams: any[] = [uuid];
            const [deleteResult]: any = await query(deleteSql, deleteParams);
    
            // Verifica si se eliminó alguna fila en la base de datos
            if (deleteResult.affectedRows > 0) {
                // Elimina las imágenes asociadas
                if (driverData[0].url_img) {
                    await deleteFromFirebase(driverData[0].url_img);
                }
                return "El vehiculo y sus archivos asociados se han eliminado correctamente.";
            } else {
                // Si no se eliminó ninguna fila, el UUID podría no existir en la tabla
                return "El vehiculo con el UUID especificado no existe.";
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            return error as Error;
        }
    }
}


