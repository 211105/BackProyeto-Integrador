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
exports.isEmailRegistered = void 0;
const connection_1 = require("../../../database/connection");
function isEmailRegistered(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkEmailSql = `
        SELECT COUNT(*) as emailCount
        FROM users
        WHERE email = ?;
    `;
        const [emailResults] = yield (0, connection_1.query)(checkEmailSql, [email]);
        if (emailResults[0].emailCount > 0) {
            throw new Error("El correo electrónico ya está registrado en la base de datos.");
        }
    });
}
exports.isEmailRegistered = isEmailRegistered;
//# sourceMappingURL=ownermysql.js.map