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
var userService = require('../services/users.service');
var UserController = /** @class */ (function () {
    function UserController() {
    }
    /*
        1) add access token to localStorage
        2) add refresh token to cookie with http-only flag
    */
    UserController.prototype.signup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, users, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userService.signup({ email: email, password: password })];
                    case 1:
                        users = _b.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        next(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, users, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userService.login({ email: email, password: password })];
                    case 1:
                        users = _b.sent();
                        res.cookie('refreshToken', users.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        next(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.cookies['refreshToken'];
                        return [4 /*yield*/, userService.logout(refreshToken)];
                    case 1:
                        token = _a.sent();
                        res.json(token);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.activate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var link, activatedUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        link = req.params.link;
                        return [4 /*yield*/, userService.activate(link)];
                    case 1:
                        activatedUser = _a.sent();
                        res.redirect("/api/users");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.refresh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (err) {
                    next(err);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        res.json(users.rows);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        next(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userService.createUser({ email: email, password: password })];
                    case 1:
                        users = _b.sent();
                        res.json(users.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userService.getUsers()];
                    case 1:
                        users = _a.sent();
                        res.json(users.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, userService.getOneUser(id)];
                    case 1:
                        user = _a.sent();
                        res.json(user.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, email, password, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userService.updateUser({ id: id, email: email, password: password })];
                    case 1:
                        users = _b.sent();
                        res.json(users.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        console.log(req.query);
                        return [4 /*yield*/, userService.deleteUser(id)];
                    case 1:
                        user = _a.sent();
                        res.json(user.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
module.exports = new UserController();
