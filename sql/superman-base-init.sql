INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (1, 0, 'DIRECTORY_SYSTEM', '系统', 0, NULL, NULL, 'System Directory');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (101, 1, 'MENU_USER', '用户', 1, 'user/user', '/user/index', 'User Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (102, 1, 'MENU_ROLE', '角色', 1, 'role/role', '/role/index', 'Role Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (103, 1, 'MENU_PRIVILEGE', '权限', 1, 'privilege/priv', '/priv/index', 'Priviliege Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (104, 1, 'MENU_PARAMETER', '参数', 1, 'param/param', '/param/index', 'Parameter Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (105, 1, 'MENU_CACHE', '缓存', 1, 'cache/cache', '/cache/index', 'CacheManagement');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (106, 1, 'MENU_JOBSERVICE', '定时任务', 1, 'jobservice/jobservice', '/jobservice/index', 'JobService Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (107, 1, 'MENU_APP', 'App', 1, 'appversion/app', '/appversion/app', 'App Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (108, 1, 'MENU_APP_VERSION', 'App 版本', 1, 'appversion/index', '/appversion/index', 'App Version Management');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (109, 1, 'MENU_LOG_AUDIT', '日志审计', 1, 'logAudit/index', '/logAudit/index', 'Log Audit  Management');

INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (301, 0, 'sys:app:add', 'sys:app:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (302, 0, 'sys:app:update', 'sys:app:update', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (303, 0, 'sys:app:delete', 'sys:app:delete', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (304, 0, 'sys:app:query', 'sys:app:query', 2, 'data privliege');

INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (311, 0, 'sys:appversion:add', 'sys:appversion:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (312, 0, 'sys:appversion:update', 'sys:appversion:update', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (313, 0, 'sys:appversion:delete', 'sys:appversion:delete', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (314, 0, 'sys:appversion:query', 'sys:appversion:query', 2, 'data privliege');

INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (321, 0, 'sys:cache:query', 'sys:cache:query', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (322, 0, 'sys:cache:delete', 'sys:cache:delete', 2, 'data privliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (331, 0, 'sys:logAudit:query', 'sys:logAudit:query', 2, 'data privliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (341, 0, 'sys:param:add', 'sys:param:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (342, 0, 'sys:param:update', 'sys:param:update', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (343, 0, 'sys:param:delete', 'sys:param:delete', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (344, 0, 'sys:param:query', 'sys:param:query', 2, 'data privliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (351, 0, 'sys:priv:add', 'sys:priv:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (352, 0, 'sys:priv:update', 'sys:priv:update', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (353, 0, 'sys:priv:delete', 'sys:priv:delete', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (354, 0, 'sys:priv:query', 'sys:priv:query', 2, 'data privliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (361, 0, 'sys:role:add', 'sys:role:add', 2, 'data roleliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (362, 0, 'sys:role:update', 'sys:role:update', 2, 'data roleliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (363, 0, 'sys:role:delete', 'sys:role:delete', 2, 'data roleliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (364, 0, 'sys:role:query', 'sys:role:query', 2, 'data roleliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (371, 0, 'sys:rolepriv:add', 'sys:rolepriv:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (372, 0, 'sys:rolepriv:delete', 'sys:rolepriv:delete', 2, 'data privliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (381, 0, 'sys:user:add', 'sys:user:add', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (382, 0, 'sys:user:update', 'sys:user:update', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (383, 0, 'sys:user:delete', 'sys:user:delete', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (384, 0, 'sys:user:query', 'sys:user:query', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (385, 0, 'sys:user:lock', 'sys:user:lock', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (386, 0, 'sys:user:unlock', 'sys:user:unlock', 2, 'data userliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (387, 0, 'sys:user:resetPwd', 'sys:user:resetPwd', 2, 'data userliege');


INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (391, 0, 'sys:userrole:add', 'sys:userrole:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (392, 0, 'sys:userrole:delete', 'sys:userrole:delete', 2, 'data privliege');


INSERT INTO `SYS_ROLE` (ROLE_ID, ROLE_CODE, ROLE_NAME, DESCRIPTION)
VALUES (1, 'SYSTEM_ADMIN', 'System Admin', 'System Administrator'),
    (2, 'TEST_ADMIN', 'Test Admin', 'Test Administrator');

INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID)
VALUES (1, 1), (1, 101), (1, 102), (1, 103), (1, 104), (1, 105), (1, 106), (1, 107), (1, 108), (1, 109);

INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 301), (1, 302), (1, 303), (1, 304);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 311), (1, 312), (1, 313), (1, 314);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 321), (1, 322);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 331);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 341), (1, 342), (1, 343), (1, 344);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 351), (1, 352), (1, 353), (1, 354);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 361), (1, 362), (1, 363), (1, 364);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 371), (1, 372);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID)
VALUES (1, 381), (1, 382), (1, 383), (1, 384), (1, 385), (1, 386), (1, 387);
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 391), (1, 392);

INSERT INTO `SYS_USER` (USER_ID, USER_NAME, USER_CODE, PWD, MOBILE, MEMO, USER_EFF_DATE, USER_EXP_DATE, CREATED_DATE, STATE, STATE_DATE, IS_LOCKED, PWD_EXP_DATE, FORCE_LOGIN, LOGIN_FAIL, UNLOCK_DATE, USER_SRC)
VALUES (1, 'Administrator', 'admin', '57dd03ed397eabaeaa395eb740b770fd', '10086', '管理员', '2016-12-20 12:12:12', NULL,
           '2016-12-20 12:12:12', 'A', '2016-12-20 12:12:12', 'N', NULL, NULL, 0, NULL, 0);

INSERT INTO `SYS_USER_ROLE` (ROLE_ID, USER_ID) VALUES (1, 1);

-- 1.0.8 banner
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (400, 0, 'sys:banner:add', 'sys:banner:add', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (401, 0, 'sys:banner:delete', 'sys:banner:delete', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (402, 0, 'sys:banner:update', 'sys:banner:update', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (403, 0, 'sys:banner:query', 'sys:banner:query', 2, 'data privliege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION, URL, PATH)
VALUES (404, 1, 'MENU_BANNER', 'Banner', 1, 'banner Management', 'banner/banner', '/banner/index');
INSERT INTO `SYS_ROLE_PRIV` (`ROLE_ID`, `PRIV_ID`) VALUES (1, 400), (1, 401), (1, 402), (1, 403), (1, 404);

-- 1.0.9
-- bulletin
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (421, 0, 'sys:bulletin:add', 'sys:bulletin:add', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (422, 0, 'sys:bulletin:delete', 'sys:bulletin:delete', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (423, 0, 'sys:bulletin:update', 'sys:bulletin:update', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (424, 0, 'sys:bulletin:query', 'sys:bulletin:query', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (425, 0, 'sys:bulletin:count', 'sys:bulletin:count', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION, URL, PATH)
VALUES (420, 1, 'MENU_BULLETIN', '公告', 1, 'bulletin Management', 'bulletin/bulletin', '/bulletin/index');
INSERT INTO `SYS_ROLE_PRIV` (`ROLE_ID`, `PRIV_ID`) VALUES (1, 420), (1, 421), (1, 422), (1, 423), (1, 424), (1, 425);

-- common group
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (431, 0, 'sys:group:add', 'sys:group:add', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (432, 0, 'sys:group:delete', 'sys:group:delete', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (433, 0, 'sys:group:update', 'sys:group:update', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (434, 0, 'sys:group:query', 'sys:group:query', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (435, 0, 'sys:group:biz', 'sys:group:biz', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (436, 0, 'sys:group:count', 'sys:group:count', 2, 'data privilege');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION, URL, PATH)
VALUES (430, 1, 'MENU_GROUP', '分组', 1, 'group Management', 'group/group', '/group/index');
INSERT INTO `SYS_ROLE_PRIV` (`ROLE_ID`, `PRIV_ID`)
VALUES (1, 430), (1, 431), (1, 432), (1, 433), (1, 434), (1, 435), (1, 436);
--
-- file upload menu
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES
    (410, 1, 'MENU_FILE_UPLOAD', '文件上传', 1, 'fileUpload/index', '/fileUpload/index', 'File Upload Management');

-- file priv
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (411, 0, 'sys:file:save', 'sys:file:save', 2, 'upload file priviledge');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (412, 0, 'sys:file:delete', 'sys:file:delete', 2, 'delete upload file priviledge');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (413, 0, 'sys:file:query', 'sys:file:query', 2, 'query upload file priviledge');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (414, 0, 'sys:file:update', 'sys:file:update', 2, 'update upload file');

INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 410), (1, 411), (1, 412), (1, 413), (1, 414);

-- 1.2.0 sys picture
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION, URL, PATH)
VALUES (460, 1, 'MENU_PICTURE', '图片管理', 1, 'picture Management', 'pictureUpload/picture', '/pictureUpload/index');
INSERT INTO `SYS_ROLE_PRIV` (`ROLE_ID`, `PRIV_ID`)
VALUES (1, 460);

-- 2.0.0
-- 流程管理
-- 44x,45x

-- 目录
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (3, 0, 'DIRECTORY_BPMN', '流程管理', 0, NULL, NULL, '流程管理');

-- 菜单
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (440, 3, 'MENU_BPMN_RULE', '流程规则', 1, 'bpmn/rule', '/bpmn/rule', '流程规则');

-- bpmn priv
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (441, 3, 'sys:bpmn:save', 'sys:bpmn:save', 2, '保存');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (442, 3, 'sys:bpmn:delete', 'sys:bpmn:delete', 2, '删除');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, DESCRIPTION)
VALUES (443, 3, 'sys:bpmn:query', 'sys:bpmn:query', 2, '查询');

INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 3), (1, 440), (1, 441), (1, 442), (1, 443);

-- TODO 暂时不考虑数据权限问题
-- 菜单
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (450, 3, 'MENU_BPMN_INSTANCE', '流程实例', 1, 'bpmn/instance', '/bpmn/instance', '流程实例');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (451, 3, 'MENU_BPMN_MY_TASK', '待办任务', 1, 'bpmn/myTask', '/bpmn/myTask', '代办任务');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (452, 3, 'MENU_BPMN_MY_TASK_HIS', '任务历史', 1, 'bpmn/myTaskHis', '/bpmn/myTaskHis', '任务历史');
INSERT INTO `SYS_PRIV` (PRIV_ID, PARENT_PRIV_ID, PRIV_CODE, PRIV_NAME, TYPE, URL, PATH, DESCRIPTION)
VALUES (453, 3, 'MENU_BPMN_APPLY', '流程申请', 1, 'bpmn/apply', '/bpmn/apply', '流程申请');
--
INSERT INTO `SYS_ROLE_PRIV` (ROLE_ID, PRIV_ID) VALUES (1, 450), (1, 451), (1, 452), (1, 453);
