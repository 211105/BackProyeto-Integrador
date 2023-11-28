"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.activitRoutes = express_1.default.Router();
exports.activitRoutes.get('/rutine/', (req, res) => {
    res.status(200).send('Rutina ejecutada con éxito');
});
exports.activitRoutes.post("/", dependencies_1.addActivityController.run.bind(dependencies_1.addActivityController));
exports.activitRoutes.delete("/", dependencies_1.deleteActivityController.run.bind(dependencies_1.deleteActivityController));
exports.activitRoutes.put("/", dependencies_1.updateActivityControllr.run.bind(dependencies_1.updateActivityControllr));
exports.activitRoutes.get("/", dependencies_1.listActivitysController.run.bind(dependencies_1.listActivitysController));
//# sourceMappingURL=activityRouter.js.map