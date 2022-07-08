var jwt = require('jsonwebtoken');
var auth = function (req, res, next) {
    try {
        var authHeader = String(req.headers['authorization'] || '');
        if (!authHeader.startsWith('Bearer ')) {
            throw new Error('Access denied');
        }
        var token = authHeader.substring(7, authHeader.length);
        // if token is invalid throws respective error
        var decodedData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.decodedData = decodedData;
        next();
    }
    catch (err) {
        next(err);
    }
};
module.exports = auth;
