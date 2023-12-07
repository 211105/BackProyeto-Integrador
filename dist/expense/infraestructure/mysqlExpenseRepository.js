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
exports.MysqlExpenseRepository = void 0;
const connection_1 = require("../../database/connection");
const expense_1 = require("../domain/expense");
class MysqlExpenseRepository {
    createExpense(uuid, weekly_amount_uuid, category, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let expenseSql = "INSERT INTO expenses(uuid, weekly_amount_uuid, category, amount) VALUES (?, ?, ?, ?)";
                const expenseParams = [uuid, weekly_amount_uuid, category, amount];
                yield (0, connection_1.query)(expenseSql, expenseParams);
                let updateSql = "UPDATE weekly_amount SET amount_update = amount_update - ? WHERE uuid = ?";
                const updateParams = [amount, weekly_amount_uuid];
                yield (0, connection_1.query)(updateSql, updateParams);
                return new expense_1.Expense(uuid, weekly_amount_uuid, category, amount);
            }
            catch (error) {
                console.error("Error adding expense:", error);
                return error;
            }
        });
    }
    updateAmountExpense(uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
                const getWeeklyAmountUuidParams = [uuid];
                const [weeklyAmountUuidResult] = yield (0, connection_1.query)(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);
                const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;
                let getPreviousAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
                const getPreviousAmountParams = [uuid];
                const [previousAmountResult] = yield (0, connection_1.query)(getPreviousAmountSql, getPreviousAmountParams);
                const previousAmount = parseFloat(previousAmountResult[0].amount);
                console.log(previousAmount);
                let getCurrentAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
                const getCurrentAmountUpdateParams = [weeklyAmountUuid];
                const [currentAmountUpdateResult] = yield (0, connection_1.query)(getCurrentAmountUpdateSql, getCurrentAmountUpdateParams);
                const currentAmountUpdate = parseFloat(currentAmountUpdateResult[0].amount_update);
                console.log(currentAmountUpdate);
                if (isNaN(previousAmount) || isNaN(currentAmountUpdate)) {
                    throw new Error("Invalid numeric values for the sum.");
                }
                const newAmountUpdate = previousAmount + currentAmountUpdate;
                console.log(newAmountUpdate);
                let updateAmountUpdateSql = "UPDATE weekly_amount SET amount_update = ? WHERE uuid = ?";
                const updateAmountUpdateParams = [newAmountUpdate, weeklyAmountUuid];
                yield (0, connection_1.query)(updateAmountUpdateSql, updateAmountUpdateParams);
                let updateSql = "UPDATE expenses SET amount = ? WHERE uuid = ?";
                const updateParams = [amount, uuid];
                yield (0, connection_1.query)(updateSql, updateParams);
                let getExpenseSql = "SELECT * FROM expenses WHERE uuid = ?";
                const getExpenseParams = [uuid];
                const [updatedExpenseResult] = yield (0, connection_1.query)(getExpenseSql, getExpenseParams);
                const updatedExpense = updatedExpenseResult[0];
                let updateAmountUpdateAfterExpenseSql = "UPDATE weekly_amount SET amount_update = amount_update - ? WHERE uuid = ?";
                const updateAmountUpdateAfterExpenseParams = [amount, weeklyAmountUuid];
                yield (0, connection_1.query)(updateAmountUpdateAfterExpenseSql, updateAmountUpdateAfterExpenseParams);
                return new expense_1.Expense(updatedExpense.uuid, weeklyAmountUuid, updatedExpense.category, updatedExpense.amount);
            }
            catch (error) {
                console.error("Error updating expense amount:", error);
                return error;
            }
        });
    }
    deleteExpenseByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
                const getWeeklyAmountUuidParams = [uuid];
                const [weeklyAmountUuidResult] = yield (0, connection_1.query)(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);
                const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;
                const getAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
                const getAmountParams = [uuid];
                const [amountResult] = yield (0, connection_1.query)(getAmountSql, getAmountParams);
                const amount = parseFloat(amountResult[0].amount);
                const getCurrentAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
                const getCurrentAmountUpdateParams = [weeklyAmountUuid];
                const [currentAmountUpdateResult] = yield (0, connection_1.query)(getCurrentAmountUpdateSql, getCurrentAmountUpdateParams);
                const currentAmountUpdate = parseFloat(currentAmountUpdateResult[0].amount_update);
                if (isNaN(amount) || isNaN(currentAmountUpdate)) {
                    throw new Error("Invalid numeric values for the update.");
                }
                const newAmountUpdate = currentAmountUpdate + amount;
                const updateAmountUpdateSql = "UPDATE weekly_amount SET amount_update = ? WHERE uuid = ?";
                const updateAmountUpdateParams = [newAmountUpdate, weeklyAmountUuid];
                yield (0, connection_1.query)(updateAmountUpdateSql, updateAmountUpdateParams);
                const deleteSql = "DELETE FROM expenses WHERE uuid = ?";
                const deleteParams = [uuid];
                yield (0, connection_1.query)(deleteSql, deleteParams);
                return "El gasto se ha eliminado correctamente, y la suma en weekly_amount se ha actualizado.";
            }
            catch (error) {
                console.error("Error deleting expense:", error);
                return error;
            }
        });
    }
    getExpensesByWeekly(weekly_amount_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM expenses WHERE weekly_amount_uuid = ?";
                const params = [weekly_amount_uuid];
                const [result] = yield (0, connection_1.query)(sql, params);
                if (result.length > 0) {
                    const expenses = result.map((row) => {
                        return new expense_1.Expense(row.uuid, row.weekly_amount_uuid, row.category, row.amount);
                    });
                    return expenses;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error("Error retrieving files by expenses:", error);
                return error;
            }
        });
    }
}
exports.MysqlExpenseRepository = MysqlExpenseRepository;
//# sourceMappingURL=mysqlExpenseRepository.js.map