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
exports.MysqlMarkRepository = void 0;
const connection_1 = require("../../database/connection");
const mark_1 = require("../domain/mark");
class MysqlMarkRepository {
    createMark(uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "INSERT INTO pines(uuid, location, description, create_date, end_date, url_image, user_uuid, activity_uuid) VALUES (?, POINT(?, ?), ?, UTC_TIMESTAMP(), ADDDATE(UTC_TIMESTAMP(), INTERVAL ? HOUR_MINUTE), ?, ?, ?)";
                const params = [uuid, latitude, longitude, description, endDate, urlImage, userUuid, activityUuid];
                const [result] = yield (0, connection_1.query)(sql, params);
                return result;
            }
            catch (error) {
                console.log(error);
                return `${error}`;
            }
        });
    }
    listMarks(userLatitude, userLongitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = `
                SELECT p.uuid, 
                ST_X(p.location) AS latitude, 
                ST_Y(p.location) AS longitude, 
                p.description, 
                p.create_date, 
                p.end_date, 
                p.url_image, 
                p.user_uuid, 
                p.activity_uuid,
                (ST_Distance_Sphere(
                    POINT(ST_Y(p.location), ST_X(p.location)), 
                    POINT(?, ?)
                ) / 1000) AS distance_km
            FROM pines p
            WHERE p.end_date > NOW()
            HAVING distance_km <= 4;   
                `;
                const result = yield (0, connection_1.query)(sql, [userLongitude, userLatitude]);
                if (!result) {
                    return null;
                }
                const [pines] = result;
                for (const pin of pines) {
                    sql = "SELECT uuid, name, img_url AS urlImage FROM users WHERE uuid = ?";
                    const [userOwner] = yield (0, connection_1.query)(sql, [pin.user_uuid]);
                    pin.userOwners = userOwner;
                    sql = "SELECT u.uuid, u.name, u.img_url AS urlImage FROM users u JOIN assists a ON u.uuid = a.user_uuid WHERE a.pin_uuid = ?";
                    const [userAsists] = yield (0, connection_1.query)(sql, [pin.uuid]);
                    pin.userAsists = userAsists;
                    sql = "SELECT uuid, name, url_image FROM activitys WHERE uuid = ?";
                    const [activity] = yield (0, connection_1.query)(sql, [pin.activity_uuid]);
                    pin.infoActivity = activity[0];
                }
                console.log(pines);
                const marks = pines.map((pin) => new mark_1.MarkDescription(pin.uuid, pin.latitude, pin.longitude, pin.description, pin.create_date, pin.end_date, pin.url_image, pin.user_uuid, pin.activity_uuid, pin.userOwners, pin.userAsists, pin.infoActivity));
                return marks;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    userAsist(uuid, markUuid, userUuid, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkAttendanceSql = "SELECT * FROM assists WHERE user_uuid = ? AND pin_uuid = ?";
                const checkAttendanceParams = [userUuid, markUuid];
                const [attendanceResult] = yield (0, connection_1.query)(checkAttendanceSql, checkAttendanceParams);
                if (attendanceResult.length > 0) {
                    return "El usuario ya ha asistido.";
                }
                const sql = `SELECT ST_X(location) AS latitude, ST_Y(location) AS longitude FROM pines WHERE uuid = ?`;
                const params = [markUuid];
                const [[locationResult]] = yield (0, connection_1.query)(sql, params);
                const checkDistanceSql = `
            SELECT ST_Distance_Sphere(
                POINT(?, ?), 
                POINT(?, ?)
            ) AS distance
            `;
                const checkParams = [longitude, latitude, locationResult.longitude, locationResult.latitude];
                console.log(checkParams);
                const [[distanceResult]] = yield (0, connection_1.query)(checkDistanceSql, checkParams);
                if (distanceResult.distance <= 500) {
                    const insertSql = "INSERT INTO assists (uuid, attended_at, pin_uuid, user_uuid) VALUES (?, UTC_TIMESTAMP(), ?, ?);";
                    const insertParams = [uuid, markUuid, userUuid];
                    yield (0, connection_1.query)(insertSql, insertParams);
                    return "exitoso";
                }
                else {
                    return "Usuario fuera de rango.";
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.MysqlMarkRepository = MysqlMarkRepository;
//# sourceMappingURL=mysqlMarkRepository.js.map