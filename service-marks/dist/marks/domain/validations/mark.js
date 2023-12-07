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
exports.ValidatorUserAssist = exports.ValidatorListMark = exports.ValidatorCreateMark = void 0;
const class_validator_1 = require("class-validator");
class ValidatorCreateMark {
    constructor(uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid) {
        this.uuid = uuid,
            this.latitude = latitude,
            this.longitude = longitude,
            this.description = description,
            this.endDate = endDate,
            this.urlImage = urlImage,
            this.userUuid = userUuid,
            this.activityUuid = activityUuid;
    }
}
exports.ValidatorCreateMark = ValidatorCreateMark;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorCreateMark.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorCreateMark.prototype, "longitude", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 600),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "urlImage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "userUuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreateMark.prototype, "activityUuid", void 0);
class ValidatorListMark {
    constructor(userLatitude, userLongitude) {
        this.userLatitude = userLatitude,
            this.userLongitude = userLongitude;
    }
}
exports.ValidatorListMark = ValidatorListMark;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorListMark.prototype, "userLatitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorListMark.prototype, "userLongitude", void 0);
class ValidatorUserAssist {
    constructor(uuid, markUuid, userUuid, latitude, longitude) {
        this.uuid = uuid;
        this.markUuid = markUuid;
        this.userUuid = userUuid;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.ValidatorUserAssist = ValidatorUserAssist;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUserAssist.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUserAssist.prototype, "markUuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUserAssist.prototype, "userUuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorUserAssist.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorUserAssist.prototype, "longitude", void 0);
//# sourceMappingURL=mark.js.map