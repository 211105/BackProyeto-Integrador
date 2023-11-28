"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlOwnerRepository = void 0;
const connection_1 = require("../../database/connection");
const owner_1 = require("../domain/owner");
class MysqlOwnerRepository {
    registerOwner(uuid, name, surname, second_surname, email, password, phone_number, img_url, type_user, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO owners (uuid, name, surname, second_surname, email, password, phone_number,img_url,type_user,status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const params = [uuid, name, surname, second_surname, email, password, phone_number, img_url, type_user, status];
                const [result] = yield (0, connection_1.query)(sql, params);
                return new owner_1.Owner(uuid, name, surname, second_surname, email, password, phone_number, img_url, type_user, status);
            }
            catch (error) {
                console.error("Error adding review:", error);
                return error;
            }
        });
    }
    updateOwner(uuid, name, surname, second_surname, email, phone_number, img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (name !== undefined)
                updates.name = name;
            if (surname !== undefined)
                updates.surname = surname;
            if (second_surname !== undefined)
                updates.second_surname = second_surname;
            if (email !== undefined)
                updates.email = email;
            if (phone_number !== undefined)
                updates.phone_number = phone_number;
            if (img_url !== undefined) {
                updates.img_url = img_url;
            }
            const [existingRows] = yield (0, connection_1.query)('SELECT img_url FROM owners WHERE uuid = ?', [uuid]);
            if (!existingRows || existingRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }
            const existingImgUrl = existingRows[0].img_url;
            const keys = Object.keys(updates);
            if (keys.length === 0)
                return null;
            const sqlParts = keys.map(key => `${key} = ?`);
            const sql = `UPDATE owners SET ${sqlParts.join(', ')} WHERE uuid = ?`;
            try {
                const values = keys.map(key => updates[key]);
                values.push(uuid);
                yield (0, connection_1.query)(sql, values);
                const [updatedRows] = yield (0, connection_1.query)('SELECT * FROM owners WHERE uuid = ?', [uuid]);
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No user found with the provided UUID.');
                }
                const updatedOwner = new owner_1.Owner(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].surname, updatedRows[0].second_surname, updatedRows[0].email, updatedRows[0].password, updatedRows[0].phone_number, updatedRows[0].img_url, updatedRows[0].type_username, updatedRows[0].status);
                return updatedOwner;
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw error;
            }
        });
    }
    deleteOwnner(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM owners WHERE uuid = ?';
                const result = yield (0, connection_1.query)(sql, [uuid]);
                if (result[0].affectedRows === 0) {
                    return null;
                }
                return 'Owner deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        });
    }
}
exports.MysqlOwnerRepository = MysqlOwnerRepository;
//# sourceMappingURL=mysqlOwnerRepository.js.map