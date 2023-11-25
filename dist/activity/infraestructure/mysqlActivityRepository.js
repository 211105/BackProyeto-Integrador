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
exports.MysqlActivityRepository = void 0;
const activity_1 = require("../domain/activity");
const connection_1 = require("../../database/connection");
class MysqlActivityRepository {
    addActivity(uuid, name, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO activitys(uuid, name, url_image) VALUES (?,?,?)";
                const params = [uuid, name, imgUrl];
                const [rsult] = yield (0, connection_1.query)(sql, params);
                return new activity_1.Activity(uuid, name, imgUrl);
            }
            catch (error) {
                console.error("Error adding activity:", error);
                return null;
            }
        });
    }
    deleteActivity(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "DELETE FROM activitys WHERE uuid = ?";
                const params = [uuid];
                const [rsult] = yield (0, connection_1.query)(sql, params);
                return rsult;
            }
            catch (error) {
                return `${error}`;
            }
        });
    }
    updateActivity(uuid, name, imgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updates = {};
            if (name !== undefined)
                updates.name = name;
            if (imgUrl !== undefined)
                updates.imgUrl = imgUrl;
            const keys = Object.keys(updates);
            if (keys.length === 0)
                return null;
            const sqlParts = keys.map(key => `${key} = ?`);
            const sql = `UPDATE activitys SET ${sqlParts.join(', ')} WHERE uuid = ?`;
            try {
                const values = keys.map(key => updates[key]);
                values.push(uuid);
                yield (0, connection_1.query)(sql, values);
                return "Actividad actualizada con éxito";
            }
            catch (error) {
                console.error('Error updating activity:', error);
                return `Error al actualizar la actividad: ${error}`;
            }
        });
    }
    listActyvitiys() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT uuid, name, url_image FROM activitys";
                const [results] = yield (0, connection_1.query)(sql);
                const activities = results.map((row) => new activity_1.Activity(row.uuid, row.name, row.url_image));
                return activities;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlActivityRepository = MysqlActivityRepository;
//# sourceMappingURL=mysqlActivityRepository.js.map