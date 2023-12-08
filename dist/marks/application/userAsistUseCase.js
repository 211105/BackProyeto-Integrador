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
exports.UserAsistUseCase = void 0;
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const mark_1 = require("../domain/validations/mark");
class UserAsistUseCase {
    constructor(markRepository) {
        this.markRepository = markRepository;
    }
    run(markUuid, userUuid, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const numLatitude = Number(latitude);
            const numLongitude = Number(longitude);
            const miuuid = (0, uuid_1.v4)();
            try {
                let data = new mark_1.ValidatorUserAssist(miuuid, markUuid, userUuid, numLatitude, numLongitude);
                const validation = yield (0, class_validator_1.validate)(data);
                if (validation.length > 0) {
                    throw new Error(JSON.stringify(validation));
                }
                const createMark = yield this.markRepository.userAsist(miuuid, markUuid, userUuid, latitude, longitude);
                return createMark;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserAsistUseCase = UserAsistUseCase;
//# sourceMappingURL=userAsistUseCase.js.map