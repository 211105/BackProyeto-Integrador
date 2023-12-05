"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const getSuspender = (promise) => {
    let status = "pending";
    let response;
    const suspender = promise.then((res) => {
        status = "success";
        response = res;
    }, (err) => {
        status = "error";
        response = err;
    });
    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    };
    return { read };
};
function fetchData(url) {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((json) => json);
    return getSuspender(promise);
}
exports.fetchData = fetchData;
//# sourceMappingURL=usersOwners.js.map