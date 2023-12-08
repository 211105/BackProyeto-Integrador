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
exports.fetchUserOwners = void 0;
function fetchUserOwners(userUuids, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!token) {
                throw Error("No hay token ");
            }
            const rows = userUuids;
            const uuids = rows.map(pin => pin.user_uuid);
            const url = "https://allgate.cristilex.com/api/v1/users/owners/";
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ uuids }),
                redirect: 'follow'
            };
            const response = yield fetch(url, requestOptions);
            const result = yield response.json();
            return result;
        }
        catch (error) {
            console.error('Error fetching user owners:', error);
            throw error;
        }
    });
}
exports.fetchUserOwners = fetchUserOwners;
//# sourceMappingURL=usersOwners.js.map