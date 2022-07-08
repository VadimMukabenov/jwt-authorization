"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
var userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(10).required()
});
exports.default = userSchema;
