"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.fileRoutes = express_1.default.Router();
exports.fileRoutes.post('/', dependencies_1.createFileController.post.bind(dependencies_1.createFileController));
exports.fileRoutes.put('/', dependencies_1.updateFileController.update.bind(dependencies_1.updateFileController));
exports.fileRoutes.get('/:notes_uuid', dependencies_1.getFilesByFolderController.get.bind(dependencies_1.getFilesByFolderController));
exports.fileRoutes.delete('/:uuid', dependencies_1.deleteFileController.delete.bind(dependencies_1.deleteFileController));
//# sourceMappingURL=fileRoutes.js.map