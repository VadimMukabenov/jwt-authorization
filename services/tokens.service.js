const db = require('../db');
const jwt = require('jsonwebtoken');

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        if(!userId || !refreshToken) {
            throw new Error('You need to pass all fields');
        }
        const candidate = await db.query(
            'SELECT * FROM tokens WHERE user_id = $1', [userId]
        );
        // postgres query returns obj containing prop rows
        // prop rows contains a result array

        if(candidate.rows[0]) {
            const updatedRefreshToken = await db.query(
                'UPDATE tokens set refresh_token = $1 where user_id = $2 RETURNING *', [refreshToken, userId]
            );
            return updatedRefreshToken;
        }
        const newRefreshToken = await db.query(
            'INSERT INTO tokens (refresh_token, user_id) values ($1, $2) RETURNING *', [refreshToken, userId]
        );

        return newRefreshToken;
    }

    async removeToken(refreshToken) {
        if(!refreshToken) {
            throw new Error('You need to pass all fields');
        }
        const token = await db.query(
            'DELETE FROM tokens WHERE refresh_token = $1', [refreshToken]
        );

        // when delete return obj with prop rows
        // rows is a result array
        // when delete rows is empty array
        return token.rowCount > 0;
    }
}

module.exports = new TokenService();
