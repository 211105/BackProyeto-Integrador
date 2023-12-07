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
exports.RegisterUserUseCase = void 0;
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
const user_1 = require("../domain/validations/user");
const ashs_1 = require("../../helpers/ashs");
class RegisterUserUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    run(name, email, phone_number, img_url, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            let data = new user_1.ValidatorRegisterUser(miuuid, name, email, phone_number, img_url, password);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            const hashPassword = yield (0, ashs_1.encrypt)(password);
            try {
                const createUser = yield this.usuarioRepository.registerUser(miuuid, name, email, phone_number, img_url, hashPassword);
                return createUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=registerUseCase.js.map