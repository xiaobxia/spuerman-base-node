/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
const UserController = require('../controllers/sys/user');
const LoginController = require('../controllers/sys/login');
const PrivilegeController = require('../controllers/sys/privilege');
const RoleController = require('../controllers/sys/role');
const RolePrivController = require('../controllers/sys/rolePriv');
let userController = new UserController();
let loginController = new LoginController();
let privilegeController = new PrivilegeController();
let roleController = new RoleController();
let rolePrivController = new RolePrivController();
let router = express.Router();

// router.get('/sys/test', test.test);
//
//登录
router.post('/sys/login', loginController.login());
router.get('/sys/isLogin', loginController.isLogin());
router.get('/sys/logout', loginController.logout());
//权限
router.get('/sys/priv/menu', privilegeController.menu());
router.get('/sys/priv/privsCount', privilegeController.getPrivsCount());
router.get('/sys/priv/privs', privilegeController.getPrivs());
router.get('/sys/priv/rootPrivs', privilegeController.getRootPrivs());
router.get('/sys/priv/rolepriv', privilegeController.getPrivsByRoleId());
router.post('/sys/priv/add', privilegeController.addPriv());
router.post('/sys/priv/update', privilegeController.updatePriv());
router.get('/sys/priv/delete/:id', privilegeController.deletePrivById());
router.get('/sys/priv/:id', privilegeController.getPrivById());
// 用户
router.post('/sys/user/checkUserMenuPriv', userController.checkUserMenuPriv());
router.post('/sys/user/changePwd', userController.changePwd());
router.get('/sys/user/usersCount', userController.getUsersCount());
router.get('/sys/user/users', userController.getUsers());
router.post('/sys/user/add', userController.addUser());
router.post('/sys/user/update', userController.updateUser());
router.get('/sys/user/userrole/:id', userController.getUsersByRoleId());
router.get('/sys/user/:id', userController.getUser());
// 角色
router.get('/sys/role/rolesCount', roleController.getRolesCount());
router.get('/sys/role/roles', roleController.getRoles());
router.post('/sys/rolepriv/add', rolePrivController.addPrivToRole());
router.delete('/sys/rolepriv/:roleId/:privId', rolePrivController.deletePrivInRole());
module.exports = router;
