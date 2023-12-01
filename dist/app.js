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
const signale_1 = require("signale");
const serviceAccount = __importStar(require("./helpers/integrador-9.json"));
const admin = __importStar(require("firebase-admin"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "integrador-ff8cd.appspot.com/"
});
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use((0, express_fileupload_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const proxyOptionsUser = {
    target: 'https://user.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/users': '',
    },
};
const proxyOptionsAuth = {
    target: 'https://user.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/users/auth': '',
    },
};
const proxyOptionsMark = {
    target: 'https://mark.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/pins': '',
    },
};
const proxyOptionsNote = {
    target: 'https://note.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/notes': '',
    },
};
const proxyOptionsFile = {
    target: 'https://file.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/files': '',
    },
};
const proxyOptionsWeekyAmount = {
    target: 'https://mount.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/weeklyAmoun': '',
    },
};
const proxyOptionsExpense = {
    target: 'https://expense.cristilex.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/expenses': '',
    },
};
app.get('/rutine', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
app.use('/api/v1/users', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsUser));
app.use('/api/v1/users/auth', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsAuth));
app.use('/api/v1/pins/', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsMark));
app.use('/api/v1/notes', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsNote));
app.use('/api/v1/files', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsFile));
app.use('/api/v1/weeklyAmoun', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsWeekyAmount));
app.use('/api/v1/expenses', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptionsExpense));
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});
//# sourceMappingURL=app.js.map