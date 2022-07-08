"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth = function (req, res, next) {
    try {
        var authHeader = String(req.headers['authorization'] || '');
        if (!authHeader.startsWith('Bearer ')) {
            throw new Error('Access denied');
        }
        var token = authHeader.substring(7, authHeader.length);
        // if token is invalid throws respective error
        var decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.decodedData = decodedData;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = auth;
