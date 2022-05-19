const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = String(req.headers['authorization'] || '');
        if (!authHeader.startsWith('Bearer ')) {
            throw new Error('Access denied');
        }
        const token = authHeader.substring(7, authHeader.length);
        
        // if token is invalid throws respective error
        const decodedData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        
        req.decodedData = decodedData;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = auth;