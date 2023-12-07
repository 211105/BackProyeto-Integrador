"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseLogin = exports.User = void 0;
class User {
    constructor(uuid, name, email, phone_number, img_url, password) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.img_url = img_url;
        this.password = password;
    }
}
exports.User = User;
class ResponseLogin {
    constructor(uuid, name, email, phone_number, img_url, token) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.img_url = img_url;
        this.token = token;
    }
}
exports.ResponseLogin = ResponseLogin;
//# sourceMappingURL=user.js.map