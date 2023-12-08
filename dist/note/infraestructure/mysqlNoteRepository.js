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
exports.MysqlNoteRepository = void 0;
const connection_1 = require("../../database/connection");
const note_1 = require("../domain/note");
class MysqlNoteRepository {
    createNote(uuid, user_uuid, title, description, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO notes(uuid, user_uuid, title, description, status) VALUES (?, ?, ?, ?, ?)";
                console.log('Params:', uuid, user_uuid, title, description, status);
                const params = [uuid, user_uuid, title, description, status];
                const [result] = yield (0, connection_1.query)(sql, params);
                return new note_1.Note(uuid, user_uuid, title, description, status);
            }
            catch (error) {
                console.error("Error adding review:", error);
                return error;
            }
        });
    }
    updateNote(uuid, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectSql = "SELECT * FROM notes WHERE uuid = ?";
                const selectParams = [uuid];
                const [selectResult] = yield (0, connection_1.query)(selectSql, selectParams);
                if (selectResult.length === 0) {
                    return null;
                }
                const currentNote = selectResult[0];
                const updateFields = {};
                if (title !== undefined) {
                    updateFields.title = title;
                }
                if (description !== undefined) {
                    updateFields.description = description;
                }
                if (Object.keys(updateFields).length === 0) {
                    return new note_1.Note(currentNote.uuid, currentNote.user_uuid, currentNote.title, currentNote.description, currentNote.status);
                }
                const updateSql = "UPDATE notes SET " + Object.keys(updateFields).map((field) => `${field} = ?`).join(", ") + " WHERE uuid = ?";
                const updateParams = [...Object.values(updateFields), uuid];
                const [updateResult] = yield (0, connection_1.query)(updateSql, updateParams);
                if (updateResult.affectedRows > 0) {
                    return new note_1.Note(currentNote.uuid, currentNote.user_uuid, title !== undefined ? title : currentNote.title, description !== undefined ? description : currentNote.description, currentNote.url_file);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error updating note:", error);
                return error;
            }
        });
    }
    getNoteByUser(user_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM notes WHERE user_uuid = ?";
                const params = [user_uuid];
                const [result] = yield (0, connection_1.query)(sql, params);
                if (result.length > 0) {
                    const notes = result.map((row) => {
                        return new note_1.Note(row.uuid, row.user_uuid, row.title, row.description, row.status);
                    });
                    return notes;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error retrieving files by user:", error);
                return error;
            }
        });
    }
    delteFile(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteSql = "DELETE FROM notes WHERE uuid = ?";
                const deleteParams = [uuid];
                const [deleteResult] = yield (0, connection_1.query)(deleteSql, deleteParams);
                if (deleteResult.affectedRows > 0) {
                    return "La nota se ha eliminado correctamente.";
                }
                else {
                    return "La nota con el UUID especificado no existe.";
                }
            }
            catch (error) {
                console.error("Error deleting file:", error);
                return error;
            }
        });
    }
}
exports.MysqlNoteRepository = MysqlNoteRepository;
//# sourceMappingURL=mysqlNoteRepository.js.map