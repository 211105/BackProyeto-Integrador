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
const saveFile_1 = __importDefault(require("../../../helpers/saveFile"));
const file_1 = require("../../domain/file");
class CreateFileController {
    constructor(createFileUseCase) {
        this.createFileUseCase = createFileUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_uuid, notes_uuid } = req.body;
                if (!req.files || !req.files.url_file) {
                    return res.status(400).send({
                        status: "error",
                        message: "No image file uploaded."
                    });
                }
                const imgFile = req.files.url_file;
                let type_file = null;
                const fileName = imgFile.name;
                console.log(fileName);
                const fileExtension = imgFile.name.split('.').pop();
                if (fileExtension) {
                    switch (fileExtension.toLowerCase()) {
                        case 'png':
                            type_file = 'image/png';
                            break;
                        case 'jpg':
                        case 'jpeg':
                            type_file = 'image/jpeg';
                            break;
                        case 'gif':
                            type_file = 'image/gif';
                            break;
                        case 'mp3':
                            type_file = 'audio/mpeg';
                            break;
                        case 'wav':
                            type_file = 'audio/wav';
                            break;
                        case 'oog':
                            type_file = 'audio/ogg';
                            break;
                        case 'aac':
                            type_file = 'audio/aac';
                            break;
                        case '""':
                            type_file = 'audio/aac';
                            break;
                        case 'pdf':
                            type_file = 'document/pdf';
                            break;
                    }
                }
                const url_file = yield (0, saveFile_1.default)(imgFile, type_file);
                console.log(url_file);
                const createFile = yield this.createFileUseCase.post(user_uuid, notes_uuid, fileName, url_file, type_file || '', false);
                const noteWithCreatedAt = createFile;
                if (createFile instanceof file_1.File) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: noteWithCreatedAt.uuid,
                            user_uuid: noteWithCreatedAt.user_uuid,
                            notes_uuid: noteWithCreatedAt.notes_uuid,
                            title: noteWithCreatedAt.title,
                            url_file: noteWithCreatedAt.url_file,
                            type_file: noteWithCreatedAt.type_file,
                            status: noteWithCreatedAt.status,
                            created_at: noteWithCreatedAt.created_at
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