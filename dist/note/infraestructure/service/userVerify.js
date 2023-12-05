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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarUsuario = void 0;
const axios_1 = __importDefault(require("axios"));
function verificarUsuario(user_uuid) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Verificando si el usuario existe...');
        try {
            const servicioUrl = `https://allgate.cristilex.com/api/v1/users/${user_uuid}`;
            const response = yield axios_1.default.get(servicioUrl);
            if (response.status === 200 || response.status === 201) {
                console.log(`El usuario ${user_uuid} existe.`);
                return true;
            }
            else if (response.status === 404) {
                console.log(`El usuario ${user_uuid} no existe.`);
                return false;
            }
            else if (response.status === 500) {
                console.error('Error en el servidor:', response);
                return false;
            }
            else {
                throw new Error(`Error en la solicitud HTTP. Código de estado: ${response.status}`);
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error(`Error en la solicitud HTTP: ${error.message}, Código de estado: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status}`);
            }
            else {
                console.error(`Error general: ${error.message}`);
            }
            throw error;
        }
    });
}
exports.verificarUsuario = verificarUsuario;
//# sourceMappingURL=userVerify.js.map