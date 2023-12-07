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
exports.GetExpensesByWeeklyController = void 0;
class GetExpensesByWeeklyController {
    constructor(getExpensesByWeeklyUseCase) {
        this.getExpensesByWeeklyUseCase = getExpensesByWeeklyUseCase;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { weekly_amount_uuid } = req.params;
                const getExpensesByWeekly = yield this.getExpensesByWeeklyUseCase.get(weekly_amount_uuid);
                if (getExpensesByWeekly) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            Expenses: getExpensesByWeekly
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "Expenses not found "
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
                    message: "An error occurred while update the Expenses."
                });
            }
        });
    }
}
exports.GetExpensesByWeeklyController = GetExpensesByWeeklyController;
//# sourceMappingURL=getExpensesByWeeklyController.js.map