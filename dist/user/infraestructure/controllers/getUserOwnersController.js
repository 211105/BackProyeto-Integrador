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
exports.GetUserOwnersControllers = void 0;
class GetUserOwnersControllers {
    constructor(getUserOwnersUseCase) {
        this.getUserOwnersUseCase = getUserOwnersUseCase;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuids } = req.body;
                const getUser = yield this.getUserOwnersUseCase.get(uuids);
                if (getUser) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            getUser
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while userowner"
                    });
                }
            }
            catch (error) {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while update the user."
                });
            }
        });
    }
}
exports.GetUserOwnersControllers = GetUserOwnersControllers;
//# sourceMappingURL=getUserOwnersController.js.map