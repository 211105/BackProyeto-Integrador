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
exports.RegisterOwnerUseCase = void 0;
const uuid_1 = require("uuid");
const ashs_1 = require("../../helpers/ashs");
const owner_1 = require("../domain/validations/owner");
const class_validator_1 = require("class-validator");
class RegisterOwnerUseCase {
    constructor(ownerRepository) {
        this.ownerRepository = ownerRepository;
    }
    post(name, surname, second_surname, email, password, phone_number, img_url, type_user, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const miuuid = (0, uuid_1.v4)();
            let data = new owner_1.ValidatorRegisterOwner(miuuid, name, surname, second_surname, email, password, phone_number, img_url);
            const validation = yield (0, class_validator_1.validate)(data);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            const hashPassword = yield (0, ashs_1.encrypt)(password);
            try {
                const registerOwner = yield this.ownerRepository.registerOwner(miuuid, name, surname, second_surname, email, hashPassword, phone_number, img_url, type_user, status);
                return registerOwner;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.RegisterOwnerUseCase = RegisterOwnerUseCase;
//# sourceMappingURL=registerOwnerUseCase.js.map