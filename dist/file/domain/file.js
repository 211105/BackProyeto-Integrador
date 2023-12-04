"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    constructor(uuid, user_uuid, notes_uuid, title, url_file, type_file, status) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.notes_uuid = notes_uuid;
        this.title = title;
        this.url_file = url_file;
        this.type_file = type_file;
        this.status = status;
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map