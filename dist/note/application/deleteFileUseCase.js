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
exports.DeleteFileUseCase = void 0;
const class_validator_1 = require("class-validator");
const note_1 = require("../domain/validations/note");
class DeleteFileUseCase {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    delete(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new note_1.ValidatorId(uuid);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const deleteFile = yield this.noteRepository.delteFile(uuid);
                return deleteFile;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.DeleteFileUseCase = DeleteFileUseCase;
//# sourceMappingURL=deleteFileUseCase.js.map