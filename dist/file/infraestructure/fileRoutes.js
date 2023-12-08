"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const veryfyToken_1 = require("../../helpers/veryfyToken");
exports.fileRoutes = express_1.default.Router();
exports.fileRoutes.get('/rutine/', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
exports.fileRoutes.post('/', veryfyToken_1.validateToken, dependencies_1.createFileController.post.bind(dependencies_1.createFileController));
exports.fileRoutes.put('/', veryfyToken_1.validateToken, dependencies_1.updateFileController.update.bind(dependencies_1.updateFileController));
exports.fileRoutes.get('/:notes_uuid', veryfyToken_1.validateToken, dependencies_1.getFilesByFolderController.get.bind(dependencies_1.getFilesByFolderController));
exports.fileRoutes.delete('/:uuid', veryfyToken_1.validateToken, dependencies_1.deleteFileController.delete.bind(dependencies_1.deleteFileController));
//# sourceMappingURL=fileRoutes.js.map