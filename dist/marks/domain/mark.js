"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkDescription = exports.Mark = void 0;
class Mark {
    constructor(uuid, latitude, longitude, description, createDate, endDate, urlImage, userUuid, activityUuid) {
        this.uuid = uuid;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.createDate = createDate;
        this.endDate = endDate;
        this.urlImage = urlImage;
        this.userUuid = userUuid;
        this.activityUuid = activityUuid;
    }
}
exports.Mark = Mark;
class MarkDescription {
    constructor(uuid, latitude, longitude, description, createDate, endDate, urlImage, userUuid, activityUuid, userOwners, userAsists, infoActivity) {
        this.uuid = uuid;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.createDate = createDate;
        this.endDate = endDate;
        this.urlImage = urlImage;
        this.userUuid = userUuid;
        this.activityUuid = activityUuid;
        this.userOwners = userOwners;
        this.userAsists = userAsists;
        this.infoActivity = infoActivity;
    }
}
exports.MarkDescription = MarkDescription;
//# sourceMappingURL=mark.js.map