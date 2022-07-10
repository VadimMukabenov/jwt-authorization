import * as express from 'express';
import userController from '../controllers/users.controller';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import usersSchema from '../common/schemas/users/post.request.schema';

const router = express.Router();

router.post('/signup', validationMiddleware(usersSchema), userController.signup);
router.post('/login', validationMiddleware(usersSchema), authMiddleware, userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/', userController.getAllUsers);


export default router;
