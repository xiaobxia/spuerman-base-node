/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
const UserController = require('../controllers/sys/user');
const LoginController = require('../controllers/sys/login');
const PrivilegeController = require('../controllers/sys/privilege');
let userController = new UserController();
let loginController = new LoginController();
let privilegeController = new PrivilegeController();
let router = express.Router();

// router.get('/sys/test', test.test);
//
//登录
router.post('/sys/login', loginController.login());
router.get('/sys/isLogin', loginController.isLogin());
router.get('/sys/logout', loginController.logout());
//权限
router.get('/sys/priv/menu', privilegeController.menu());
// 用户
router.post('/sys/user/checkUserMenuPriv', userController.checkUserMenuPriv());
router.post('/sys/user/changePwd', userController.changePwd());
router.get('/sys/user/usersCount', userController.getUserCount());
router.get('/sys/users', userController.getUsers());
router.get('/sys/user/:id', userController.getUser());

module.exports = router;
