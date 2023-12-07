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
exports.UpdatePasswordController = void 0;
class UpdatePasswordController {
    constructor(updatePasswordUseCase) {
        this.updatePasswordUseCase = updatePasswordUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, password, } = req.body;
                let updatePasswor = yield this.updatePasswordUseCase.run(uuid, password);
                if (updatePasswor) {
                    return res.status(200).send({
                        status: "succes",
                        data: {}
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "User not found"
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes('Duplicate entry') && error.message.includes('for key \'users.email\'')) {
                        return res.status(409).send({
                            status: "error",
                            message: "The email address is already in use. Please use a different email address.",
                        });
                    }
                    else if (error.message.startsWith('[')) {
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message)
                        });
                    }
                }
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while update password."
                });
            }
        });
    }
}
exports.UpdatePasswordController = UpdatePasswordController;
//# sourceMappingURL=updatePasswordUserController.js.map