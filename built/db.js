"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: 'postgres',
    password: 'Monstrik98',
    port: 5432,
    host: 'localhost',
    database: 'auth_for_beginners',
});
exports.default = pool;
