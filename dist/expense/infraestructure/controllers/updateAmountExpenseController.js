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
exports.UpdateAmountExpenseController = void 0;
class UpdateAmountExpenseController {
    constructor(updataAmountExpenseUseCase, verifyUpdateAmountUseCase) {
        this.updataAmountExpenseUseCase = updataAmountExpenseUseCase;
        this.verifyUpdateAmountUseCase = verifyUpdateAmountUseCase;
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, amount } = req.body;
                const verifyAmount = yield this.verifyUpdateAmountUseCase.get(uuid, amount);
                if (!verifyAmount) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'La actualización del amount no es válida. Revasa a la cantiada semanal disponibleee',
                    });
                }
                const updateAmount = yield this.updataAmountExpenseUseCase.update(uuid, amount);
                if (updateAmount) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            updateAmount
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while register the Expense."
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
exports.UpdateAmountExpenseController = UpdateAmountExpenseController;
//# sourceMappingURL=updateAmountExpenseController.js.map