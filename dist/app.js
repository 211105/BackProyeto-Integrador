"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const dotenv_1 = __importDefault(require("dotenv"));
const signale_1 = require("signale");
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use('/api/v1/users', (0, express_http_proxy_1.default)('https://user.cristilex.com'));
app.use('/api/v1/marks', (0, express_http_proxy_1.default)('https://mark.cristilex.com'));
app.use('/api/v1/notes', (0, express_http_proxy_1.default)('https://note.cristilex.com'));
app.use('/api/v1/files', (0, express_http_proxy_1.default)('https://file.cristilex.com'));
app.use('/api/v1/mount', (0, express_http_proxy_1.default)('https://mount.cristilex.com'));
app.use('/api/v1/expense', (0, express_http_proxy_1.default)('https://expense.cristilex.com'));
app.listen(PORT, () => {
    signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map