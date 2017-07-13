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

let router = express.Router();

// router.get('/sys/test', test.test);
//
// //登录
// router.post('/sys/login', login.login);
// router.get('/sys/isLogin', login.isLogin);
// router.get('/sys/logout', login.logout);
// //权限
// router.get('/sys/priv/menu', priv.menu);
//
// router.post('/sys/user/checkUserMenuPriv', user.checkUserMenuPriv);
// router.post('/sys/user/changePwd', user.changePwd);
// router.get('/sys/user/usersCount', user.usersCount);
// router.get('/sys/user/:id', user.showUser);
// router.get('/sys/users', user.getUsers);
router.get('/sys/user/:id', function (req, res, next) {
  userController.getUser(req, res, next);
});

module.exports = router;
