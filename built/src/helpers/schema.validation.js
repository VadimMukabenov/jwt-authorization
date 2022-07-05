"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = function (schema, value, options) {
    if (options === void 0) { options = {}; }
    return schema.validate(value, options);
};
exports.default = validate;
