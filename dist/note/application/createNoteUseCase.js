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
exports.CreateNoteUseCase = void 0;
const uuid_1 = require("uuid");
const note_1 = require("../domain/validations/note");
const class_validator_1 = require("class-validator");
class CreateNoteUseCase {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    post(user_uuid, title, description, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            let data = new note_1.ValidatorNote(miuuid, user_uuid, title, description, status);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createNote = yield this.noteRepository.createNote(miuuid, user_uuid, title, description, status);
                return createNote;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateNoteUseCase = CreateNoteUseCase;
//# sourceMappingURL=createNoteUseCase.js.map