var Router = require('express');
var router = new Router();
var userController = require('../controllers/users.controller');
var authMiddleware = require('../middlewares/auth.middleware');
var validationMiddleware = require('../middlewares/validation.middleware');
var usersSchema = require('../common/schemas/users/post.request.schema');
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
module.exports = router;