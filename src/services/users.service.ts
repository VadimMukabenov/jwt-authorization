import db from '../../db';
import * as bcrypt from 'bcrypt';
import tokensService from './tokens.service';
import UserDto from '../dto/user-dto';
import * as uuid from 'uuid';
import mailService from './mail.service';

interface IInput {
    email: string;
    password: string;
}

class UserService {


    /*
        1) generate tokens === DONE
        2) bind tokens to user id === DONE
        3) return tokens === DONE

            TODO
        4) add activate via node-mailer === DONE
        5) add input validation === DONE
    */

    async signup(input: IInput) {
        const { email, password } = input;

        if(!email || !password) {
            throw new Error('You need to pass all fields');
        }
        const candidate = await db.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        if(candidate.rows[0]) {
            throw new Error(`user with email ${email} already exists`);
        }
        const pass = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const isActivated = false;

        const newUser = await db.query('INSERT INTO users (email, password, activation_link, is_activated) values ($1, $2, $3, $4) RETURNING *', [email, pass, activationLink, isActivated]);
        await mailService.sendMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
        
        const userDto = new UserDto(newUser.rows[0]);

        const tokens = await tokensService.generateTokens({ ...userDto });
        await tokensService.saveToken(userDto.id, tokens.refreshToken);

        return {
            user: { ...userDto },
            tokens: { ...tokens }
        };
    }

    async login(input: IInput) {
        const { email, password } = input;

        if(!email || !password) {
            throw new Error('You need to pass all fields');
        }
        const candidate = await db.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        if(!candidate.rows.length) {
            throw new Error(`user with email ${email} doesn't exist`);
        }

        const user = candidate.rows[0];
        console.log(user);

        const isValidPassword: boolean = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            throw new Error(`Wrong password!`);
        }

        const userDto = new UserDto(user);

        const tokens = await tokensService.generateTokens({ ...userDto });
        await tokensService.saveToken(userDto.id, tokens.refreshToken);

        return {
            user: { ...userDto },
            tokens: { ...tokens }
        };

    }

    async logout(refreshToken: string) {
        const tokenRowCount = await tokensService.removeToken(refreshToken);
        return tokenRowCount;
    }

    async activate(activationLink: string) {
        const user = await db.query('UPDATE users set is_activated = TRUE where activation_link = $1 RETURNING *', [activationLink]);
        return user;
    }

    async refresh() {
        
    }

    async getAllUsers() {
        const users = await db.query('SELECT * FROM users');
        return users;
    }


    // async createUser({ email, password }) {
    //     if(!email || !password) {
    //         throw new Error('You need to pass all fields');
    //     }

    //     const user = await db.query('INSERT INTO users (email, password) values ($1, $2) RETURNING *', [email, password]);
        
    //     return user;
    // }
    // async getUsers() {
    //     const users = await db.query('SELECT * FROM users');
    //     return users;
    // }
    // async getOneUser(id) {
    //     const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    //     return user;
    // }
    // async updateUser({ id, email, password }) {
    //     const updatedUser = await db.query('UPDATE users set email = $1, password = $2 where id = $3 RETURNING *', [email, password, id]);
    //     return updatedUser;
    // }
    // async deleteUser(id) {
    //     const deletedUser = await db.query('DELETE FROM users WHERE id = $1', [id]);
    //     return deletedUser;
    // }
}

export default new UserService();
