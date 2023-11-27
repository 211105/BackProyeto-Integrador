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
exports.DeleteExpenseByUuidController = void 0;
class DeleteExpenseByUuidController {
    constructor(deleteExpenseByUuidUseCase) {
        this.deleteExpenseByUuidUseCase = deleteExpenseByUuidUseCase;
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid } = req.params;
                const deleteExpense = yield this.deleteExpenseByUuidUseCase.delete(uuid);
                if (deleteExpense) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            deleteExpense
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
exports.DeleteExpenseByUuidController = DeleteExpenseByUuidController;
//# sourceMappingURL=deleteExpenseByUuidController.js.map