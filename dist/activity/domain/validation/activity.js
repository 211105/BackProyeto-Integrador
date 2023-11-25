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
exports.ValidatorUpdateActivity = exports.ValidatorDeleteActivity = exports.ValidatorAddActivity = void 0;
const class_validator_1 = require("class-validator");
class ValidatorAddActivity {
    constructor(uuid, name, imgUrl) {
        this.uuid = uuid,
            this.name = name,
            this.imgUrl = imgUrl;
    }
}
exports.ValidatorAddActivity = ValidatorAddActivity;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorAddActivity.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 150),
    __metadata("design:type", String)
], ValidatorAddActivity.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorAddActivity.prototype, "imgUrl", void 0);
class ValidatorDeleteActivity {
    constructor(uuid) {
        this.uuid = uuid;
    }
}
exports.ValidatorDeleteActivity = ValidatorDeleteActivity;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorDeleteActivity.prototype, "uuid", void 0);
class ValidatorUpdateActivity {
    constructor(uuid, name, imgUrl) {
        this.uuid = uuid,
            this.name = name,
            this.imgUrl = imgUrl;
    }
}
exports.ValidatorUpdateActivity = ValidatorUpdateActivity;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUpdateActivity.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorUpdateActivity.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorUpdateActivity.prototype, "imgUrl", void 0);
//# sourceMappingURL=activity.js.map