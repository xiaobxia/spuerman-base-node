/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
// const login = require('../controllers/sys/login');
// const priv = require('../controllers/sys/privilege');
// const user = require('../controllers/sys/user');
// const test = require('../controllers/test');
const UserController = require('../controllers/sys/user');
let userController = new UserController();
const LoginController = require('../controllers/sys/login');
let loginController = new LoginController();

let router = express.Router();

// router.get('/sys/test', test.test);
//
//登录
router.post('/sys/login', loginController.login());
router.get('/sys/isLogin', loginController.isLogin());
router.get('/sys/logout', loginController.logout());
// //权限
// router.get('/sys/priv/menu', priv.menu);
//
router.post('/sys/user/checkUserMenuPriv', userController.checkUserMenuPriv());
router.post('/sys/user/changePwd', userController.changePwd());
router.get('/sys/user/usersCount',  userController.getUserCount());
// router.get('/sys/user/:id', user.showUser);
router.get('/sys/users', userController.getUsers());
router.get('/sys/user/:id', userController.getUser());

module.exports = router;
