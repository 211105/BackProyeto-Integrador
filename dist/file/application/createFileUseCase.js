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
exports.CreateFileUseCase = void 0;
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const file_1 = require("../domain/validations/file");
class CreateFileUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    post(user_uuid, notes_uuid, title, url_file, type_file, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            let data = new file_1.ValidatorFile(miuuid, user_uuid, notes_uuid, title, url_file, type_file, status);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createFile = yield this.fileRepository.createFile(miuuid, user_uuid, notes_uuid, title, url_file, type_file, status);
                return createFile;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateFileUseCase = CreateFileUseCase;
//# sourceMappingURL=createFileUseCase.js.map