const validate = require('../helpers/schema.validation');

const validationMiddleware = (schema) => async (req, res, next) => {
    try {
        await validate(schema, req.body);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = validationMiddleware;
