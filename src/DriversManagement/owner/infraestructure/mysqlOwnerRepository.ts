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
}