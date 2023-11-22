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
exports.MysqlFileRepository = void 0;
const connection_1 = require("../../database/connection");
const file_1 = require("../domain/file");
class MysqlFileRepository {
    createFile(uuid, user_uuid, notes_uuid, title, url_file, type_file, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO files(uuid, user_uuid, notes_uuid, title, url_file, type_file, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
                console.log('Params:', uuid, user_uuid, notes_uuid, title, url_file, type_file, status);
                const params = [uuid, user_uuid, notes_uuid, title, url_file, type_file, status];
                const [result] = yield (0, connection_1.query)(sql, params);
                return new file_1.File(uuid, user_uuid, notes_uuid, title, url_file, type_file, status);
            }
            catch (error) {
                console.error("Error adding review:", error);
                return error;
            }
        });
    }
    updateFile(uuid, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectSql = "SELECT * FROM files WHERE uuid = ?";
                const selectParams = [uuid];
                const [selectResult] = yield (0, connection_1.query)(selectSql, selectParams);
                if (selectResult.length === 0) {
                    return null;
                }
                const currentNote = selectResult[0];
                const updateSql = "UPDATE files SET title = ? WHERE uuid = ?";
                const updateParams = [title, uuid];
                const [updateResult] = yield (0, connection_1.query)(updateSql, updateParams);
                if (updateResult.affectedRows > 0) {
                    return new file_1.File(currentNote.uuid, currentNote.user_uuid, currentNote.notes_uuid, title, currentNote.url_file, currentNote.type_file, currentNote.status);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error updating file name:", error);
                return error;
            }
        });
    }
    getFilesByFolder(notes_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM files WHERE notes_uuid = ?";
                const params = [notes_uuid];
                const [result] = yield (0, connection_1.query)(sql, params);
                if (result.length > 0) {
                    const notes = result.map((row) => {
                        return new file_1.File(row.uuid, row.user_uuid, row.notes_uuid, row.title, row.url_file, row.type_file, row.status);
                    });
                    return notes;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error retrieving files by Files:", error);
                return error;
            }
        });
    }
    deleteFile(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteSql = "DELETE FROM files WHERE uuid = ?";
                const deleteParams = [uuid];
                const [deleteResult] = yield (0, connection_1.query)(deleteSql, deleteParams);
                if (deleteResult.affectedRows > 0) {
                    return "El archivo se ha eliminado correctamente.";
                }
                else {
                    return "El archivo el UUID especificado no existe.";
                }
            }
            catch (error) {
                console.error("Error deleting file:", error);
                return error;
            }
        });
    }
}
exports.MysqlFileRepository = MysqlFileRepository;
//# sourceMappingURL=mysqlFileRepository.js.map