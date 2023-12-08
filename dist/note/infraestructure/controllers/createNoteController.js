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
exports.CreateNoteController = void 0;
const note_1 = require("../../domain/note");
const userVerify_1 = require("../service/userVerify");
const axios_1 = __importDefault(require("axios"));
class CreateNoteController {
    constructor(createNoteUseCase) {
        this.createNoteUseCase = createNoteUseCase;
    }
    post(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_uuid, title, description } = req.body;
                const authToken = req.header('Authorization');
                const userExists = yield (0, userVerify_1.verificarUsuario)(user_uuid, authToken);
                if (!userExists) {
                    return res.status(404).send({
                        status: "error",
                        message: `The user ${user_uuid} does not exist. Cannot create the note.`
                    });
                }
                const createFile = yield this.createNoteUseCase.post(user_uuid, title, description, false);
                if (createFile instanceof note_1.Note) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: createFile.uuid,
                            user_uuid: createFile.user_uuid,
                            title: createFile.title,
                            description: createFile.description,
                            status: createFile.status
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while registering the Note."
                    });
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console.error(`Error en la solicitud HTTP: ${error.message}, Código de estado: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status}`);
                    if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 500) {
                        return res.status(500).send({
                            status: "error",
                            message: "An unexpected error occurred while verifying the user. The user may not exist."
                        });
                    }
                }
                else if (error instanceof Error) {
                    if (error.message.startsWith('[')) {
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message)
                        });
                    }
                    return res.status(500).send({
                        status: "error",
                        message: error.message
                    });
                }
                else {
                    console.error(`Error general: ${error.message}`);
                }
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the Note."
                });
            }
        });
    }
}
exports.CreateNoteController = CreateNoteController;
//# sourceMappingURL=createNoteController.js.map