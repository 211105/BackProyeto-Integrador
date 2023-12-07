"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorupdateAmount = exports.ValidatorUuid = exports.ValidateLogin = exports.ValidatorCreate = void 0;
const class_validator_1 = require("class-validator");
class ValidatorCreate {
    constructor(uuid, weekly_amount_uuid, category, amount) {
        this.uuid = uuid;
        this.weekly_amount_uuid = weekly_amount_uuid;
        this.category = category;
        this.amount = amount;
    }
}
exports.ValidatorCreate = ValidatorCreate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "weekly_amount_uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorCreate.prototype, "amount", void 0);
class ValidateLogin {
    constructor(email, password) {
        this.email = email,
            this.password = password;
    }
}
exports.ValidateLogin = ValidateLogin;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateLogin.prototype, "password", void 0);
class ValidatorUuid {
    constructor(uuid) {
        this.uuid = uuid;
    }
}
exports.ValidatorUuid = ValidatorUuid;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUuid.prototype, "uuid", void 0);
class ValidatorupdateAmount {
    constructor(uuid, amount) {
        this.uuid = uuid;
        this.amount = amount;
    }
}
exports.ValidatorupdateAmount = ValidatorupdateAmount;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorupdateAmount.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorupdateAmount.prototype, "amount", void 0);
//# sourceMappingURL=expense.js.map