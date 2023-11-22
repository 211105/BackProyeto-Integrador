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
exports.UpdateFileUseCase = void 0;
const class_validator_1 = require("class-validator");
const file_1 = require("../domain/validations/file");
class UpdateFileUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    update(uuid, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new file_1.ValidatorUpdate(uuid, title);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const updateFileName = yield this.fileRepository.updateFile(uuid, title);
                return updateFileName;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UpdateFileUseCase = UpdateFileUseCase;
//# sourceMappingURL=updateFileUseCase.js.map