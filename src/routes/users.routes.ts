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



// router.post('/users', userController.createUser);
// router.get('/users', userController.getUsers);
// router.get('/users/:id', userController.getOneUser);
// router.put('/users', userController.updateUser);
// router.delete('/users', userController.deleteUser);

export default router;
