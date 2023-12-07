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
exports.VerifyWeeklyAmountUseCase = void 0;
const class_validator_1 = require("class-validator");
const weeklyAmount_1 = require("../domain/validations/weeklyAmount");
class VerifyWeeklyAmountUseCase {
    constructor(weekly_amountRepository) {
        this.weekly_amountRepository = weekly_amountRepository;
    }
    get(uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new weeklyAmount_1.ValidatorupdateAmount(uuid, amount);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const getVerifyAmount = yield this.weekly_amountRepository.verifyWeeklyAmount(uuid, amount);
                return getVerifyAmount;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.VerifyWeeklyAmountUseCase = VerifyWeeklyAmountUseCase;
//# sourceMappingURL=veriFyWeeklyAmountUseCase.js.map