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
exports.MysqlWeeklyAmountRepository = void 0;
const connection_1 = require("../../database/connection");
const weekly_amount_1 = require("../domain/weekly_amount");
class MysqlWeeklyAmountRepository {
    createWeeklyAmount(uuid, user_uuid, amount, amount_update, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO weekly_amount(uuid, user_uuid, amount, amount_update, create_date, end_date, status) VALUES (?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP() + INTERVAL 5 MINUTE, ?)";
                const params = [uuid, user_uuid, amount, amount_update, status];
                const [result] = yield (0, connection_1.query)(sql, params);
                return new weekly_amount_1.createWeekly(uuid, user_uuid, amount, amount_update, status);
            }
            catch (error) {
                console.error("Error adding review:", error);
                return error;
            }
        });
    }
    getWeeklyAmountByUser(user_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM weekly_amount WHERE user_uuid = ? AND status = true LIMIT 1";
                const [rows] = yield (0, connection_1.query)(sql, [user_uuid]);
                if (!Array.isArray(rows) || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                const weekly = new weekly_amount_1.Weeklyamount(row.uuid, row.user_uuid, row.amount, row.amount_update, row.create_date, row.end_date, row.status);
                return weekly;
            }
            catch (error) {
                console.error('Error al obtener el :', error);
                return null;
            }
        });
    }
    updateStatusByUser(user_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectSql = "SELECT uuid, end_date, UTC_TIMESTAMP() FROM weekly_amount WHERE user_uuid = ? AND status = TRUE LIMIT 1";
                const [selectResult] = yield (0, connection_1.query)(selectSql, [user_uuid]);
                if (!Array.isArray(selectResult) || selectResult.length === 0) {
                    return 'No hay registros con el user_uuid y status=true.';
                }
                const row = selectResult[0];
                const endDate = new Date(row.end_date);
                const currentDate = new Date(row['UTC_TIMESTAMP()']);
                if (currentDate > endDate) {
                    const updateSql = "UPDATE weekly_amount SET status = FALSE WHERE uuid = ?";
                    const [updateResult] = yield (0, connection_1.query)(updateSql, [row.uuid]);
                    if (updateResult.affectedRows > 0) {
                        return 'El estado se actualizó correctamente.';
                    }
                    else {
                        return 'No se realizó ninguna actualización.';
                    }
                }
                else {
                    return 'El tiempo aún no ha pasado, no se realizó ninguna actualización.';
                }
            }
            catch (error) {
                console.error('Error al actualizar el estado:', error);
                return new Error('Error al actualizar el estado.');
            }
        });
    }
    updateWeeklyAmount(uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sumExpenseAmountSql = `
                SELECT COALESCE(SUM(amount), 0) as totalExpenseAmount
                FROM expenses
                WHERE weekly_amount_uuid = ?;
            `;
                const [sumExpenseResults] = yield (0, connection_1.query)(sumExpenseAmountSql, [uuid]);
                const totalExpenseAmount = sumExpenseResults[0].totalExpenseAmount || 0;
                const newAmount = amount;
                const newAmountUpdate = newAmount - totalExpenseAmount;
                const updateSql = "UPDATE weekly_amount SET amount = ?, amount_update = ? WHERE uuid = ?";
                const [updateResult] = yield (0, connection_1.query)(updateSql, [newAmount, newAmountUpdate, uuid]);
                if (updateResult.affectedRows > 0) {
                    const selectSql = "SELECT * FROM weekly_amount WHERE uuid = ?";
                    const [selectResult] = yield (0, connection_1.query)(selectSql, [uuid]);
                    if (!Array.isArray(selectResult) || selectResult.length === 0) {
                        return 'No se encontró la fila con el UUID proporcionado después de la actualización.';
                    }
                    const updatedRow = selectResult[0];
                    const updatedWeekly = new weekly_amount_1.Weeklyamount(updatedRow.uuid, updatedRow.user_uuid, updatedRow.amount, updatedRow.amount_update, updatedRow.create_date, updatedRow.end_date, updatedRow.status);
                    return updatedWeekly;
                }
                else {
                    return 'No se realizó ninguna actualización.';
                }
            }
            catch (error) {
                console.error('Error al actualizar el monto semanal:', error);
                return new Error('Error al actualizar el monto semanal.');
            }
        });
    }
    verifyWeeklyAmount(uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkWeeklyAmountUuidSql = `
                SELECT COUNT(*) as weeklyAmountUuidCount
                FROM weekly_amount
                WHERE uuid = ?;
            `;
                const [weeklyAmountUuidResults] = yield (0, connection_1.query)(checkWeeklyAmountUuidSql, [uuid]);
                const weeklyAmountUuidCount = weeklyAmountUuidResults[0].weeklyAmountUuidCount;
                if (weeklyAmountUuidCount === 0) {
                    return false;
                }
                const sumExpenseAmountSql = `
                SELECT SUM(amount) as totalExpenseAmount
                FROM expenses
                WHERE weekly_amount_uuid = ?;
            `;
                const [sumExpenseResults] = yield (0, connection_1.query)(sumExpenseAmountSql, [uuid]);
                const totalExpenseAmountString = sumExpenseResults[0].totalExpenseAmount || "0";
                const totalExpenseAmount = Number(totalExpenseAmountString);
                return totalExpenseAmount > amount;
            }
            catch (error) {
                console.error("Error during weekly_amount verification:", error);
                throw new Error("Error during weekly_amount verification");
            }
        });
    }
}
exports.MysqlWeeklyAmountRepository = MysqlWeeklyAmountRepository;
//# sourceMappingURL=mysqlWeeklyAmountRespository.js.map