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
exports.CreateFileController = void 0;
const saveImages_1 = __importDefault(require("../../../helpers/saveImages"));
const file_1 = require("../../domain/file");
const userVerify_1 = require("../service/userVerify");
class CreateFileController {
    constructor(createFileUseCase) {
        this.createFileUseCase = createFileUseCase;
    }
    post(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_uuid, notes_uuid } = req.body;
                const authToken = req.header('Authorization');
                const userExists = yield (0, userVerify_1.verificarUsuario)(user_uuid, authToken);
                if (!userExists) {
                    return res.status(404).send({
                        status: "error",
                        message: `The user ${user_uuid} does not exist. Cannot create the note.`
                    });
                }
                const imgFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.url_file;
                const fileName = imgFile === null || imgFile === void 0 ? void 0 : imgFile.name;
                const url_file = yield (0, saveImages_1.default)(imgFile);
                const createFile = yield this.createFileUseCase.post(user_uuid, notes_uuid, fileName || "", url_file, '', false);
                if (createFile instanceof file_1.File) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: createFile.uuid,
                            user_uuid: createFile.user_uuid,
                            notes_uuid: createFile.notes_uuid,
                            title: createFile.title,
                            url_file: createFile.url_file,
                            type_file: createFile.type_file,
                            status: createFile.status
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while registering the File."
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
                }
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the File."
                });
            }
        });
    }
}
exports.CreateFileController = CreateFileController;
//# sourceMappingURL=createFileController.js.map