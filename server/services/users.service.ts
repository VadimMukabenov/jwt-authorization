import * as bcrypt from 'bcrypt';
import tokensService from './tokens.service';
import UserDto from '../dto/user-dto';
import * as uuid from 'uuid';
import mailService from './mail.service';
import { user as User } from '../prisma';

interface IInput {
    email: string;
    password: string;
}

class UserService {

    async signup(input: IInput) {
        const { email, password } = input;

        if(!email || !password) {
            throw new Error('You need to pass all fields');
        }
        const user = await User.findFirst({ 
            where: {
                email
            } 
        });
        if(user) {
            throw new Error(`user with email ${email} already exists`);
        }
        const pass = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const isActivated = false;

        const newUser = await User.create({ 
            data: {
                email,
                password: pass,
                activation_link: activationLink,
                is_activated: isActivated,
            } 
        })
        
        await mailService.sendMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
        
        const userDto = new UserDto(newUser);

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
        const user = await User.findFirst({ 
            where: {
                email
            } 
        });
        if(!user) {
            throw new Error(`user with email ${email} doesn't exist`);
        }

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

    //  TODO
    async activate(activationLink: string) {
        const user = User.updateMany({
            where: {
                activation_link: activationLink
            },
            data: {
                activation_link: activationLink
            }
        });

        return user;
    }

    async refresh() {
        
    }

    async getAllUsers() {
        const users = await User.findMany();
        return users;
    }

}

export default new UserService();
