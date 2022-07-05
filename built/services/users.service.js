var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt = require('bcrypt');
var tokensService = require('./tokens.service');
var UserDto = require('../dto/user-dto');
var uuid = require('uuid');
var mailService = require('../services/mail.service');
var UserService = /** @class */ (function () {
    function UserService() {
    }
    /*
        1) generate tokens === DONE
        2) bind tokens to user id === DONE
        3) return tokens === DONE

            TODO
        4) add activate via node-mailer === DONE
        5) add input validation === DONE
    */
    UserService.prototype.signup = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var candidate, pass, activationLink, isActivated, newUser, userDto, tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!email || !password) {
                            throw new Error('You need to pass all fields');
                        }
                        return [4 /*yield*/, db.query('SELECT * FROM users WHERE email = $1', [email])];
                    case 1:
                        candidate = _b.sent();
                        if (candidate.rows[0]) {
                            throw new Error("user with email ".concat(email, " already exists"));
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 3)];
                    case 2:
                        pass = _b.sent();
                        activationLink = uuid.v4();
                        isActivated = false;
                        return [4 /*yield*/, db.query('INSERT INTO users (email, password, activation_link, is_activated) values ($1, $2, $3, $4) RETURNING *', [email, pass, activationLink, isActivated])];
                    case 3:
                        newUser = _b.sent();
                        return [4 /*yield*/, mailService.sendMail(email, "".concat(process.env.API_URL, "/api/users/activate/").concat(activationLink))];
                    case 4:
                        _b.sent();
                        userDto = new UserDto(newUser.rows[0]);
                        return [4 /*yield*/, tokensService.generateTokens(__assign({}, userDto))];
                    case 5:
                        tokens = _b.sent();
                        return [4 /*yield*/, tokensService.saveToken(userDto.id, tokens.refreshToken)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, {
                                user: __assign({}, userDto),
                                tokens: __assign({}, tokens)
                            }];
                }
            });
        });
    };
    UserService.prototype.login = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var candidate, user, isValidPassword, userDto, tokens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!email || !password) {
                            throw new Error('You need to pass all fields');
                        }
                        return [4 /*yield*/, db.query('SELECT * FROM users WHERE email = $1', [email])];
                    case 1:
                        candidate = _b.sent();
                        if (!candidate.rows.length) {
                            throw new Error("user with email ".concat(email, " doesn't exist"));
                        }
                        user = candidate.rows[0];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            throw new Error("Wrong password!");
                        }
                        userDto = new UserDto(user);
                        return [4 /*yield*/, tokensService.generateTokens(__assign({}, userDto))];
                    case 3:
                        tokens = _b.sent();
                        return [4 /*yield*/, tokensService.saveToken(userDto.id, tokens.refreshToken)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, {
                                user: __assign({}, userDto),
                                tokens: __assign({}, tokens)
                            }];
                }
            });
        });
    };
    UserService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenRowCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokensService.removeToken(refreshToken)];
                    case 1:
                        tokenRowCount = _a.sent();
                        return [2 /*return*/, tokenRowCount];
                }
            });
        });
    };
    UserService.prototype.activate = function (activationLink) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query('UPDATE users set is_activated = TRUE where activation_link = $1 RETURNING *', [activationLink])];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query('SELECT * FROM users')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.createUser = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!email || !password) {
                            throw new Error('You need to pass all fields');
                        }
                        return [4 /*yield*/, db.query('INSERT INTO users (email, password) values ($1, $2) RETURNING *', [email, password])];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query('SELECT * FROM users')];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.getOneUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query('SELECT * FROM users WHERE id = $1', [id])];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (_a) {
        var id = _a.id, email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db.query('UPDATE users set email = $1, password = $2 where id = $3 RETURNING *', [email, password, id])];
                    case 1:
                        updatedUser = _b.sent();
                        return [2 /*return*/, updatedUser];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.query('DELETE FROM users WHERE id = $1', [id])];
                    case 1:
                        deletedUser = _a.sent();
                        return [2 /*return*/, deletedUser];
                }
            });
        });
    };
    return UserService;
}());
module.exports = new UserService();
