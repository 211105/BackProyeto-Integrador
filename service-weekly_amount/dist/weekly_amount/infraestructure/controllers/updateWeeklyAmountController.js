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
exports.UpdateWeeklyAmountController = void 0;
const mysqlweeklyamount_1 = require("../validations/mysqlweeklyamount");
class UpdateWeeklyAmountController {
    constructor(UpdateWeeklyAmountUseCase) {
        this.UpdateWeeklyAmountUseCase = UpdateWeeklyAmountUseCase;
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, amount } = req.body;
                const verificationResult = yield (0, mysqlweeklyamount_1.verifyWeeklyAmount)(uuid, amount);
                if (verificationResult) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'La verificación del monto semanal no fue exitosa.',
                    });
                }
                const updateAmount = yield this.UpdateWeeklyAmountUseCase.update(uuid, amount);
                if (updateAmount) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            updateAmount
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "WeeklyAmount not found."
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
exports.UpdateWeeklyAmountController = UpdateWeeklyAmountController;
//# sourceMappingURL=updateWeeklyAmountController.js.map