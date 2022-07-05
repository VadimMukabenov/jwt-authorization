var validate = function (schema, value, options) {
    if (options === void 0) { options = {}; }
    return schema.validate(value, options);
};
module.exports = validate;
