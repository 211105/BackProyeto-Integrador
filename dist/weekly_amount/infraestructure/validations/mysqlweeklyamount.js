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
exports.verifyWeeklyAmount = exports.isWeeklyAmountUuidRegistered = void 0;
const connection_1 = require("../../../database/connection");
function isWeeklyAmountUuidRegistered(weeklyAmountUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkWeeklyAmountUuidSql = `
            SELECT COUNT(*) as weeklyAmountUuidCount
            FROM weekly_amount
            WHERE uuid = ?;
        `;
            const [weeklyAmountUuidResults] = yield (0, connection_1.query)(checkWeeklyAmountUuidSql, [weeklyAmountUuid]);
            return weeklyAmountUuidResults[0].weeklyAmountUuidCount > 0;
        }
        catch (error) {
            console.error("Error during weekly_amount_uuid registration check:", error);
            throw new Error("Error during weekly_amount_uuid registration check");
        }
    });
}
exports.isWeeklyAmountUuidRegistered = isWeeklyAmountUuidRegistered;
function verifyWeeklyAmount(uuid, userAmountString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const weeklyAmountUuidRegistered = yield isWeeklyAmountUuidRegistered(uuid);
            if (!weeklyAmountUuidRegistered) {
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
            const userAmount = Number(userAmountString);
            console.log(totalExpenseAmount);
            console.log(userAmount);
            return totalExpenseAmount > userAmount;
        }
        catch (error) {
            console.error("Error during weekly_amount verification:", error);
            throw new Error("Error during weekly_amount verification");
        }
    });
}
exports.verifyWeeklyAmount = verifyWeeklyAmount;
//# sourceMappingURL=mysqlweeklyamount.js.map