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
exports.MysqlUserRepository = void 0;
const connection_1 = require("../../database/connection");
const user_1 = require("../domain/user");
const ashs_1 = require("../../helpers/ashs");
const token_1 = require("../../helpers/token");
class MysqlUserRepository {
    registerUser(uuid, name, email, phone_number, img_url, password, type_user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO users(uuid, name, email, phone_number , password, img_url, type_user) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const params = [uuid, name, email, phone_number, password, img_url, type_user];
                const [result] = yield (0, connection_1.query)(sql, params);
                console.log("soy el resultado", result);
                return new user_1.User(uuid, name, email, phone_number, img_url, password, type_user);
            }
            catch (error) {
                console.error("Error adding:", error);
                throw error;
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [users] = yield (0, connection_1.query)('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
                if (users && users.length > 0) {
                    const user = users[0];
                    const passwordMatches = yield (0, ashs_1.compare)(password, user.password);
                    if (passwordMatches) {
                        const token = (0, token_1.tokenSigIn)(user.uuid, user.email);
                        const responseLogin = new user_1.ResponseLoginAllUsers(user, token);
                        return responseLogin;
                    }
                }
                return null;
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    updateUserById(uuid, name, phone_number, email, img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            console.log(img_url);
            if (name !== undefined)
                updates.name = name;
            if (phone_number !== undefined)
                updates.phone_number = phone_number;
            if (email !== undefined)
                updates.email = email;
            if (img_url !== undefined) {
                updates.img_url = img_url;
            }
            const keys = Object.keys(updates);
            if (keys.length === 0)
                return null;
            const sqlParts = keys.map(key => `${key} = ?`);
            const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;
            try {
                const [imgUrlUser] = yield (0, connection_1.query)('SELECT * FROM users WHERE uuid = ?', [uuid]);
                console.log("imagen que se eliminara", imgUrlUser[0].img_url);
                const values = keys.map(key => updates[key]);
                values.push(uuid);
                yield (0, connection_1.query)(sql, values);
                const [updatedRows] = yield (0, connection_1.query)('SELECT * FROM users WHERE uuid = ?', [uuid]);
                if (!updatedRows || updatedRows.length === 0) {
                    throw new Error('No user found with the provided UUID.');
                }
                const updatedUser = new user_1.User(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].email, updatedRows[0].phone_number, updatedRows[0].img_url, "", updatedRows[0].type_user);
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw error;
            }
        });
    }
    updatePassword(uuid, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = yield (0, ashs_1.encrypt)(password);
                const sql = 'UPDATE users SET password = ? WHERE uuid = ?';
                const result = yield (0, connection_1.query)(sql, [hashPassword, uuid]);
                if (!result || result.affectedRows === 0)
                    return null;
                const [updatedRows] = yield (0, connection_1.query)('SELECT * FROM users WHERE uuid = ?', [uuid]);
                if (updatedRows.length === 0)
                    return null;
                const updatedUser = new user_1.User(updatedRows[0].uuid, updatedRows[0].name, updatedRows[0].last_name, updatedRows[0].phone_number, updatedRows[0].email, updatedRows[0].password, updatedRows[0].type_user);
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating password:', error);
                throw error;
            }
        });
    }
    getUserByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield (0, connection_1.query)('SELECT * FROM users WHERE uuid = ? LIMIT 1', [uuid]);
                if (rows && rows.length > 0) {
                    const user = rows[0];
                    return new user_1.User(user.uuid, user.name, user.email, user.phone_number, user.img_url, "", user.type_user);
                }
                return null;
            }
            catch (error) {
                console.error('Error getting user by UUID:', error);
                throw error;
            }
        });
    }
    getUserOwners(userOwners) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let owners = [];
                for (const uuid of userOwners) {
                    let sql = "SELECT uuid, name, img_url AS urlImage FROM users WHERE uuid = ?";
                    const [userOwner] = yield (0, connection_1.query)(sql, [uuid]);
                    if (userOwner && userOwner.length > 0) {
                        owners.push(userOwner[0]);
                    }
                }
                return owners;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
//# sourceMappingURL=mysqUserRepository.js.map