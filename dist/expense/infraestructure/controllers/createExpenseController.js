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
exports.CreateExpenseController = void 0;
const expense_1 = require("../../domain/expense");
class CreateExpenseController {
    constructor(createExpenseUseCase, verifyWeeklyExistUseCase, verifyWeeklyAmountUseCase) {
        this.createExpenseUseCase = createExpenseUseCase;
        this.verifyWeeklyExistUseCase = verifyWeeklyExistUseCase;
        this.verifyWeeklyAmountUseCase = verifyWeeklyAmountUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { weekly_amount_uuid, category, amount } = req.body;
                const verifyWeekly = yield this.verifyWeeklyExistUseCase.get(weekly_amount_uuid);
                if (!verifyWeekly) {
                    return res.status(409).send({
                        status: 'error',
                        message: 'El weekly_amount_uuid no existe dentro de la base de datos.',
                    });
                }
                const VerifyWeeklyAmountUseCase = yield this.verifyWeeklyAmountUseCase.get(weekly_amount_uuid, amount);
                if (!VerifyWeeklyAmountUseCase) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'La cantidad que ingresaste, rebasa a la cantiad de gasto semanal o esta en 0 :c',
                    });
                }
                const createExpense = yield this.createExpenseUseCase.post(weekly_amount_uuid, category, amount);
                if (createExpense instanceof expense_1.Expense) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            uudi: createExpense.uuid,
                            weekly_amount_uuid: createExpense.weekly_amount_uuid,
                            category: createExpense.category,
                            amount: createExpense.amount,
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while register the expense."
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
exports.CreateExpenseController = CreateExpenseController;
//# sourceMappingURL=createExpenseController.js.map