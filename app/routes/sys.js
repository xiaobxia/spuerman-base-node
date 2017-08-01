/**
 * Created by xiaobxia on 2017/7/5.
 */
const express = require('express');
const AppController = require('../controllers/sys/appController');
const AppVersionController = require('../controllers/sys/appVersionController');
const FileBucketController = require('../controllers/sys/fileBucketController');
const LogAuditController = require('../controllers/sys/logAuditController');
const LoginController = require('../controllers/sys/loginController');
const ParamController = require('../controllers/sys/paramController');
const PrivilegeController = require('../controllers/sys/privilegeController');
const RoleController = require('../controllers/sys/roleController');
const RolePrivController = require('../controllers/sys/rolePrivController');
const UploadController = require('../controllers/sys/uploadController');
const UserController = require('../controllers/sys/userController');
const UserRoleController = require('../controllers/sys/userRoleController');

let appController = new AppController();
let appVersionController = new AppVersionController();
let fileBucketController = new FileBucketController();
let logAuditController = new LogAuditController();
let loginController = new LoginController();
let paramController = new ParamController();
let privilegeController = new PrivilegeController();
let roleController = new RoleController();
let rolePrivController = new RolePrivController();
let uploadController = new UploadController();
let userController = new UserController();
let userRoleController = new UserRoleController();

let router = express.Router();
//app
router.get('/sys/app/apps', appController.getAllApps());
router.post('/sys/app/add', appController.addApp());
router.post('/sys/app/update', appController.updateApp());
router.delete('/sys/app/delete/:id', appController.deleteAppById());

//appVersion
router.get('/sys/appversion/versionsCount', appVersionController.getAppVersionsCount());
router.get('/sys/appversion/versions', appVersionController.getAppVersions());
router.post('/sys/appversion/add', appVersionController.addAppVersions());
router.post('/sys/appversion/update', appVersionController.updateAppVersion());
router.delete('/sys/appversion/delete/:id', appVersionController.deleteAppVersionById());

//文件桶
router.get('/sys/fileBucket/list', fileBucketController.getAllBuckets());
router.post('/sys/fileBucket/add', fileBucketController.addBucket());
router.post('/sys/fileBucket/update', fileBucketController.updateBucket());
router.delete('/sys/fileBucket/:id', fileBucketController.deleteRoleById());

//登录日志
router.get('/sys/logAudit/logAudits', logAuditController.getLogs());
router.get('/sys/logAudit/logAuditsCount', logAuditController.getLogsCount());

//登录
router.post('/sys/login', loginController.login());
router.get('/sys/isLogin', loginController.isLogin());
router.get('/sys/logout', loginController.logout());

//参数
router.get('/sys/param/params', paramController.getParams());
router.get('/sys/param/paramsCount', paramController.getParamsCount());
router.post('/sys/param/add', paramController.addParam());
router.post('/sys/param/update', paramController.updateParam());
router.delete('/sys/param/delete/:id', paramController.deleteParamById());

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

// 角色
router.get('/sys/role/rolesCount', roleController.getRolesCount());
router.get('/sys/role/roles', roleController.getRoles());
router.post('/sys/role/add', roleController.addRole());
router.post('/sys/role/update', roleController.updateRole());
router.get('/sys/role/delete/:id', roleController.deleteRoleById());
router.get('/sys/role/userrole/:id', roleController.getRolesByUserId());
router.get('/sys/role/:id', roleController.getRoleById());

router.post('/sys/rolepriv/add', rolePrivController.addPrivToRole());
router.delete('/sys/rolepriv/:roleId/:privId', rolePrivController.deletePrivInRole());

router.post('/sys/userrole/add', userRoleController.addUserToRole());
router.delete('/sys/userrole/:userId/:roleId', userRoleController.deleteUserInRole());

//上传
router.get('/sys/upload/files', uploadController.getFiles());
router.get('/sys/upload/filesCount', uploadController.getFilesCount());
router.post('/sys/upload/save', uploadController.addFile());
router.post('/sys/upload/update', uploadController.updateFile());
router.get('/sys/upload/token', uploadController.getUploadToken());
router.get('/sys/upload/pictures', uploadController.getPictures());
router.get('/sys/upload/picturesCount', uploadController.getPicturesCount());
router.get('/sys/upload/searchFile', uploadController.getPicturesBySearch());
router.get('/sys/upload/searchFileCount', uploadController.getPicturesCountBySearch());
router.delete('/sys/upload/:id', uploadController.deleteFileById());
router.get('/sys/upload/priv/:id', uploadController.getFilePrivUrl());

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
router.get('/sys/user/delete', userController.deleteUser());
router.get('/sys/user/userrole/:id', userController.getUsersByRoleId());
router.get('/sys/user/:id', userController.getUser());

module.exports = router;
