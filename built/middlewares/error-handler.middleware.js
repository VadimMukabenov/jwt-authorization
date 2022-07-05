var errorHandler = function (err, req, res, next) {
    if (err) {
        var name_1 = err.name, message = err.message, stack = err.stack;
        stack = stack
            .replace(name_1, '')
            .replace(message, '')
            .replaceAll(/\n/g, '');
        res.json({ type: name_1, message: message, stack: stack });
    }
    next();
};
module.exports = errorHandler;
