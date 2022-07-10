import userService from '../services/users.service';

class UserController {

    /*
        1) add access token to localStorage
        2) add refresh token to cookie with http-only flag
    */

    async signup(req, res, next) {
        try {
            const { email, password } = req.body;
            const users = await userService.signup({ email, password });
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const users = await userService.login({ email, password });
            res.cookie('refreshToken', users.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies['refreshToken'];
            const token = await userService.logout(refreshToken);
            res.json(token);
        } catch (err) {
            next(err);
        }
    }

    async activate(req, res, next) {
        try {
            const { link } = req.params;
            const activatedUser = await userService.activate(link);
            res.redirect(`/api/users`);
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users.rows);
        } catch (err) {
            next(err);
        }
    }













    // async createUser(req, res) {
    //     const { email, password } = req.body;
    //     const users = await userService.createUser({ email, password });
    //     res.json(users.rows);
    // }
    // async getUsers(req, res) {
    //     const users = await userService.getUsers();
    //     res.json(users.rows);
    // }
    // async getOneUser(req, res) {
    //     const { id } = req.params;
    //     const user = await userService.getOneUser(id);
    //     res.json(user.rows);
    // }
    // async updateUser(req, res) {
    //     const { id, email, password } = req.body;
    //     const users = await userService.updateUser({ id, email, password });
    //     res.json(users.rows);
    // }
    // async deleteUser(req, res) {
    //     const { id } = req.query;
    //     console.log(req.query);
    //     const user = await userService.deleteUser(id);
    //     res.json(user.rows);
    // }
}

export default new UserController();
