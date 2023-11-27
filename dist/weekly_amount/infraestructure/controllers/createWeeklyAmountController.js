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
exports.CreateWeeklyAmountController = void 0;
const weekly_amount_1 = require("../../domain/weekly_amount");
class CreateWeeklyAmountController {
    constructor(createWeeklyAmountUseCase) {
        this.createWeeklyAmountUseCase = createWeeklyAmountUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_uuid, amount } = req.body;
                const createWeeklyAmount = yield this.createWeeklyAmountUseCase.post(user_uuid, amount, amount, true);
                if (createWeeklyAmount instanceof weekly_amount_1.createWeekly) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            uuid: createWeeklyAmount.uuid,
                            user_uuid: createWeeklyAmount.user_uuid,
                            amount: createWeeklyAmount.amount,
                            amount_update: createWeeklyAmount.amount_update,
                            status: createWeeklyAmount.status
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while register the user."
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
                    message: "An error occurred while update the expense."
                });
            }
        });
    }
}
exports.CreateWeeklyAmountController = CreateWeeklyAmountController;
//# sourceMappingURL=createWeeklyAmountController.js.map