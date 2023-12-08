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
exports.CreateMarkUseCase = void 0;
const uuid_1 = require("uuid");
const mark_1 = require("../domain/validations/mark");
const class_validator_1 = require("class-validator");
class CreateMarkUseCase {
    constructor(markRepository) {
        this.markRepository = markRepository;
    }
    run(latitude, longitude, description, urlImage, endDate, userUuid, activityUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            const numLatitude = Number(latitude);
            const numLongitude = Number(longitude);
            let data = new mark_1.ValidatorCreateMark(miuuid, numLatitude, numLongitude, description, endDate, urlImage, userUuid, activityUuid);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createMark = yield this.markRepository.createMark(miuuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid);
                return createMark;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CreateMarkUseCase = CreateMarkUseCase;
//# sourceMappingURL=createMarkUseCase.js.map