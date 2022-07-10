import jwt from 'jsonwebtoken';
import { token as Token } from '../prisma';

class TokenService {
    async generateTokens(payload: { id: number; email: string; }): Promise<{ accessToken: string, refreshToken: string }> {
        const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_TOKEN}`, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_TOKEN}`, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        if(!userId || !refreshToken) {
            throw new Error('You need to pass all fields');
        }

        const token = Token.findFirst({
            where: {
                user_id: userId
            }
        });

        if(token) {
            const updatedRefreshToken = await Token.updateMany({
                where: {
                    user_id: userId
                },
                data: {
                    refresh_token: refreshToken
                }
            })
            return updatedRefreshToken;
        }

        const newRefreshToken = await Token.create({
            data: {
                refresh_token: refreshToken,
                user_id: userId
            }
        })

        return newRefreshToken;
    }

    async removeToken(refreshToken: string) {
        if(!refreshToken) {
            throw new Error('You need to pass all fields');
        }

        const token = await Token.delete({
            where: {
                refresh_token: refreshToken
            }
        });

        return token;
    }
}

export default new TokenService();
