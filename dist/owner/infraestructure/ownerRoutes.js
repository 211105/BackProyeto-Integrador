"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.ownerRoutes = express_1.default.Router();
exports.ownerRoutes.post('/', dependencies_1.registerOwnerController.post.bind(dependencies_1.registerOwnerController));
exports.ownerRoutes.put('/update', dependencies_1.updateOwnerController.update.bind(dependencies_1.updateOwnerController));
exports.ownerRoutes.delete('/:uuid', dependencies_1.deleteOwnerController.delete.bind(dependencies_1.deleteOwnerController));
//# sourceMappingURL=ownerRoutes.js.map