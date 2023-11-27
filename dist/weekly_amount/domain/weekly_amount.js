"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeekly = exports.Weeklyamount = void 0;
class Weeklyamount {
    constructor(uuid, user_uuid, amount, amount_update, create_date, end_date, status) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.amount = amount;
        this.amount_update = amount_update;
        this.create_date = create_date;
        this.end_date = end_date;
        this.status = status;
    }
}
exports.Weeklyamount = Weeklyamount;
class createWeekly {
    constructor(uuid, user_uuid, amount, amount_update, status) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.amount = amount;
        this.amount_update = amount_update;
        this.status = status;
    }
}
exports.createWeekly = createWeekly;
//# sourceMappingURL=weekly_amount.js.map