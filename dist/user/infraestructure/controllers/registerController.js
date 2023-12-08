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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResgisterUserController = void 0;
const user_1 = require("../../domain/user");
const saveImages_1 = __importDefault(require("../../../helpers/saveImages"));
class ResgisterUserController {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    run(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, phone_number, password, } = req.body;
                const imgFile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.img_file;
                const img_url = yield (0, saveImages_1.default)(imgFile);
                let registerUser = yield this.registerUserUseCase.run(name, email, phone_number, img_url, password, 'user');
                if (registerUser instanceof user_1.User) {
                    return res.status(201).send({
                        status: "succes",
                        registerUser
                    });
                }
            }
            catch (error) {
                console.log("entre al error");
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
                    message: "Please try again later.",
                });
            }
        });
    }
}
exports.ResgisterUserController = ResgisterUserController;
//# sourceMappingURL=registerController.js.map