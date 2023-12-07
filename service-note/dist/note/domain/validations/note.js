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
exports.ValidatorUpdate = exports.ValidatorUpdateName = exports.ValidatorId = exports.ValidatorNote = void 0;
const class_validator_1 = require("class-validator");
class ValidatorNote {
    constructor(uuid, user_uuid, title, description, status) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
exports.ValidatorNote = ValidatorNote;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorNote.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorNote.prototype, "user_uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorNote.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorNote.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ValidatorNote.prototype, "status", void 0);
class ValidatorId {
    constructor(uuid) {
        this.uuid = uuid;
    }
}
exports.ValidatorId = ValidatorId;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorId.prototype, "uuid", void 0);
class ValidatorUpdateName {
    constructor(uuid, title) {
        this.uuid = uuid;
        this.title = title;
    }
}
exports.ValidatorUpdateName = ValidatorUpdateName;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUpdateName.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorUpdateName.prototype, "title", void 0);
class ValidatorUpdate {
    constructor(uuid, title, description) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
    }
}
exports.ValidatorUpdate = ValidatorUpdate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "description", void 0);
//# sourceMappingURL=note.js.map