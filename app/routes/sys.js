/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
const UserController = require('../controllers/sys/user');
const LoginController = require('../controllers/sys/login');
const PrivilegeController = require('../controllers/sys/privilege');
const RoleController = require('../controllers/sys/role');
let userController = new UserController();
let loginController = new LoginController();
let privilegeController = new PrivilegeController();
let roleController = new RoleController();
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
router.get('/sys/user/users', userController.getUsers());
router.get('/sys/user/:id', userController.getUser());
// 角色
router.get('/sys/role/rolesCount', roleController.getRolesCount());
router.get('/sys/role/roles', roleController.getRoles());
module.exports = router;
