"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const serviceAccount = __importStar(require("./helpers/integrador-9.json"));
const admin = __importStar(require("firebase-admin"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "integrador-ff8cd.appspot.com/"
});
const app = (0, express_1.default)();
app.use((0, express_fileupload_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/rutine', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
app.use('/user-service', (0, express_http_proxy_1.default)('https://user.cristilex.com'));
app.use('/mark-service', (0, express_http_proxy_1.default)('https://mark.cristilex.com'));
app.use('/note-service', (0, express_http_proxy_1.default)('https://note.cristilex.com'));
app.use('/file-service', (0, express_http_proxy_1.default)('https://file.cristilex.com'));
app.use('/weeklyAmoun-service', (0, express_http_proxy_1.default)('https://mount.cristilex.com'));
app.use('/expenses-service', (0, express_http_proxy_1.default)('https://expense.cristilex.com'));
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});
//# sourceMappingURL=app.js.map