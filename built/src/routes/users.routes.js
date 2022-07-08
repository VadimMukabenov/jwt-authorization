"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var users_controller_1 = require("../controllers/users.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var validation_middleware_1 = require("../middlewares/validation.middleware");
var post_request_schema_1 = require("../common/schemas/users/post.request.schema");
var router = express.Router();
router.post('/signup', (0, validation_middleware_1.default)(post_request_schema_1.default), users_controller_1.default.signup);
router.post('/login', (0, validation_middleware_1.default)(post_request_schema_1.default), auth_middleware_1.default, users_controller_1.default.login);
router.post('/logout', users_controller_1.default.logout);
router.get('/activate/:link', users_controller_1.default.activate);
router.get('/refresh', users_controller_1.default.refresh);
router.get('/', users_controller_1.default.getAllUsers);
// router.post('/users', userController.createUser);
// router.get('/users', userController.getUsers);
// router.get('/users/:id', userController.getOneUser);
// router.put('/users', userController.updateUser);
// router.delete('/users', userController.deleteUser);
exports.default = router;
