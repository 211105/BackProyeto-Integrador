"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseLoginAllUsers = exports.ResponseLogin = exports.User = void 0;
class User {
    constructor(uuid, name, email, phone_number, img_url, password, type_user) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.img_url = img_url;
        this.password = password;
        this.type_user = type_user;
    }
}
exports.User = User;
class ResponseLogin {
    constructor(uuid, name, email, phone_number, img_url, type_user, token) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.img_url = img_url;
        this.type_user = type_user;
        this.token = token;
    }
}
exports.ResponseLogin = ResponseLogin;
class ResponseLoginAllUsers {
    constructor(data_user, token) {
        this.data_user = data_user;
        this.token = token;
    }
}
exports.ResponseLoginAllUsers = ResponseLoginAllUsers;
//# sourceMappingURL=user.js.map