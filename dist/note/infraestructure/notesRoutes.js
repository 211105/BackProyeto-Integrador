"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.noteRoutes = express_1.default.Router();
exports.noteRoutes.delete('/:uuid', dependencies_1.deleteFileController.delete.bind(dependencies_1.deleteFileController));
exports.noteRoutes.post('/create/', dependencies_1.createNoteController.post.bind(dependencies_1.createNoteController));
exports.noteRoutes.put('/update/', dependencies_1.updateNoteController.update.bind(dependencies_1.updateNoteController));
exports.noteRoutes.get('/:folder_uuid', dependencies_1.getNoteByUserController.get.bind(dependencies_1.getNoteByUserController));
//# sourceMappingURL=notesRoutes.js.map