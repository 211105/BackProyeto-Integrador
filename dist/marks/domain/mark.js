"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = exports.MarkDescription = exports.Mark = void 0;
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
class Activity {
    constructor(uuid, name, url_image) {
        this.uuid = uuid;
        this.name = name;
        this.url_image = url_image;
    }
}
exports.Activity = Activity;
//# sourceMappingURL=mark.js.map