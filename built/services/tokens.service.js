var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var db = require('../db');
var jwt = require('jsonwebtoken');
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.generateTokens = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, refreshToken;
            return __generator(this, function (_a) {
                accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
                refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
                return [2 /*return*/, {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }];
            });
        });
    };
    TokenService.prototype.saveToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, updatedRefreshToken, newRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userId || !refreshToken) {
                            throw new Error('You need to pass all fields');
                        }
                        return [4 /*yield*/, db.query('SELECT * FROM tokens WHERE user_id = $1', [userId])];
                    case 1:
                        candidate = _a.sent();
                        if (!candidate.rows[0]) return [3 /*break*/, 3];
                        return [4 /*yield*/, db.query('UPDATE tokens set refresh_token = $1 where user_id = $2 RETURNING *', [refreshToken, userId])];
                    case 2:
                        updatedRefreshToken = _a.sent();
                        return [2 /*return*/, updatedRefreshToken];
                    case 3: return [4 /*yield*/, db.query('INSERT INTO tokens (refresh_token, user_id) values ($1, $2) RETURNING *', [refreshToken, userId])];
                    case 4:
                        newRefreshToken = _a.sent();
                        return [2 /*return*/, newRefreshToken];
                }
            });
        });
    };
    TokenService.prototype.removeToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw new Error('You need to pass all fields');
                        }
                        return [4 /*yield*/, db.query('DELETE FROM tokens WHERE refresh_token = $1', [refreshToken])];
                    case 1:
                        token = _a.sent();
                        // when delete return obj with prop rows
                        // rows is a result array
                        // when delete rows is empty array
                        return [2 /*return*/, token.rowCount > 0];
                }
            });
        });
    };
    return TokenService;
}());
module.exports = new TokenService();
