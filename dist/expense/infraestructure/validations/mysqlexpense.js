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
exports.isAmountUpdateValited = exports.isAmountUpdateValid = exports.isWeeklyAmountUuidRegistered = void 0;
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
function isAmountUpdateValid(weeklyAmountUuid, userAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getAmountUpdateSql = `
            SELECT amount_update
            FROM weekly_amount
            WHERE uuid = ?;
        `;
            const [amountUpdateResults] = yield (0, connection_1.query)(getAmountUpdateSql, [weeklyAmountUuid]);
            if (!amountUpdateResults || amountUpdateResults.length === 0) {
                throw new Error("No se encontró el registro correspondiente en la tabla weekly_amount.");
            }
            const { amount_update: currentAmountUpdate } = amountUpdateResults[0];
            const result = currentAmountUpdate - userAmount;
            return result >= 0;
        }
        catch (error) {
            console.error("Error during amount update validation:", error);
            throw new Error("Error during amount update validation");
        }
    });
}
exports.isAmountUpdateValid = isAmountUpdateValid;
function isAmountUpdateValited(expenseUuid, userAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let getWeeklyAmountUuidSql = "SELECT weekly_amount_uuid FROM expenses WHERE uuid = ?";
            const getWeeklyAmountUuidParams = [expenseUuid];
            const [weeklyAmountUuidResult] = yield (0, connection_1.query)(getWeeklyAmountUuidSql, getWeeklyAmountUuidParams);
            const weeklyAmountUuid = weeklyAmountUuidResult[0].weekly_amount_uuid;
            let getAmountUpdateSql = "SELECT amount_update FROM weekly_amount WHERE uuid = ?";
            const getAmountUpdateParams = [weeklyAmountUuid];
            const [amountUpdateResult] = yield (0, connection_1.query)(getAmountUpdateSql, getAmountUpdateParams);
            const amountUpdate = parseFloat(amountUpdateResult[0].amount_update);
            console.log(amountUpdate);
            let getAmountSql = "SELECT amount FROM expenses WHERE uuid = ?";
            const getAmountParams = [expenseUuid];
            const [amountResult] = yield (0, connection_1.query)(getAmountSql, getAmountParams);
            const amount = parseFloat(amountResult[0].amount);
            console.log(amount);
            if (isNaN(amount) || isNaN(amountUpdate)) {
                throw new Error("Invalid numeric values for the validation.");
            }
            const sumResult = amount + amountUpdate;
            console.log(sumResult);
            const difference = sumResult - userAmount;
            console.log(difference);
            return difference >= 0;
        }
        catch (error) {
            console.error("Error during amount update validation:", error);
            throw new Error("Error during amount update validation");
        }
    });
}
exports.isAmountUpdateValited = isAmountUpdateValited;
//# sourceMappingURL=mysqlexpense.js.map