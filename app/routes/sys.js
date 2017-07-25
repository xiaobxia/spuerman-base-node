/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
const UserController = require('../controllers/sys/userController');
const LoginController = require('../controllers/sys/loginController');
const PrivilegeController = require('../controllers/sys/privilegeController');
const RoleController = require('../controllers/sys/roleController');
const RolePrivController = require('../controllers/sys/rolePrivController');
const UserRoleController = require('../controllers/sys/userRoleController');
const LogAuditController = require('../controllers/sys/logAuditController');
const UploadController = require('../controllers/sys/uploadController');
const FileBucketController = require('../controllers/sys/fileBucketController');
const ParamController = require('../controllers/sys/paramController');
let userController = new UserController();
let loginController = new LoginController();
let privilegeController = new PrivilegeController();
let roleController = new RoleController();
let rolePrivController = new RolePrivController();
let userRoleController = new UserRoleController();
let logAuditController = new LogAuditController();
let uploadController = new UploadController();
let fileBucketController = new FileBucketController();
let paramController = new ParamController();
let router = express.Router();

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
router.get('/sys/priv/userpriv/:id', privilegeController.getPrivsByUserId());
router.get('/sys/priv/delete/:id', privilegeController.deletePrivById());
router.get('/sys/priv/:id', privilegeController.getPrivById());
// 用户
router.post('/sys/user/checkUserMenuPriv', userController.checkUserMenuPriv());
router.post('/sys/user/changePwd', userController.changePwd());
router.get('/sys/user/usersCount', userController.getUsersCount());
router.get('/sys/user/users', userController.getUsers());
router.post('/sys/user/add', userController.addUser());
router.post('/sys/user/update', userController.updateUser());
router.get('/sys/user/resetPwd/:id', userController.resetPwd());
router.get('/sys/user/lock/:id', userController.lockUser());
router.get('/sys/user/unlock/:id', userController.unlockUser());
router.get('/sys/user/userrole/:id', userController.getUsersByRoleId());
router.get('/sys/user/:id', userController.getUser());
// 角色
router.get('/sys/role/rolesCount', roleController.getRolesCount());
router.get('/sys/role/roles', roleController.getRoles());
router.post('/sys/role/add', roleController.addRole());
router.post('/sys/role/update',  roleController.updateRole());
router.get('/sys/role/delete/:id', roleController.deleteRoleById());
router.get('/sys/role/userrole/:id', roleController.getRolesByUserId());
router.get('/sys/role/:id', roleController.getRoleById());

router.post('/sys/rolepriv/add', rolePrivController.addPrivToRole());
router.delete('/sys/rolepriv/:roleId/:privId', rolePrivController.deletePrivInRole());

router.post('/sys/userrole/add', userRoleController.addUserToRole());
router.delete('/sys/userrole/:userId/:roleId', userRoleController.deleteUserInRole());

router.get('/sys/logAudit/logAudits', logAuditController.showLogs());
router.get('/sys/logAudit/logAuditsCount', logAuditController.getLogsCount());

router.get('/sys/upload/files', uploadController.showFiles());
router.get('/sys/upload/filesCount', uploadController.getFilesCount());
router.get('/sys/upload/token', uploadController.getUploadToken());
router.post('/sys/upload/save', uploadController.addFile());

router.get('/sys/fileBucket/list', fileBucketController.getAllBuckets());
router.post('/sys/fileBucket/add', fileBucketController.addBucket());
router.post('/sys/fileBucket/update', fileBucketController.updateBucket());
router.delete('/sys/fileBucket/:id', fileBucketController.deleteRoleById());

router.get('/sys/param/params', paramController.showParams());
router.get('/sys/param/paramsCount', paramController.getParamsCount());
router.post('/sys/param/add', paramController.addParam());
router.post('/sys/param/update', paramController.updateParam());
router.delete('/sys/param/delete/:id', paramController.deleteParamById());

module.exports = router;
