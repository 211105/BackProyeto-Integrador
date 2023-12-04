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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteController = void 0;
const note_1 = require("../../domain/note");
const userVerify_1 = require("../service/userVerify");
class CreateNoteController {
    constructor(createNoteUseCase) {
        this.createNoteUseCase = createNoteUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_uuid, title, description } = req.body;
                yield (0, userVerify_1.verificarUsuario)(user_uuid);
                const createFile = yield this.createNoteUseCase.post(user_uuid, title, description, false);
                const noteWithCreatedAt = createFile;
                if (createFile instanceof note_1.Note) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: noteWithCreatedAt.uuid,
                            user_uuid: noteWithCreatedAt.user_uuid,
                            title: noteWithCreatedAt.title,
                            description: noteWithCreatedAt.description,
                            status: noteWithCreatedAt.status,
                            created_at: noteWithCreatedAt.created_at
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
                if (error instanceof Error) {
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