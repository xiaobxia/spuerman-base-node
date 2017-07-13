/**
 * Created by xiaobxia on 2017/6/30.
 */
const co = require('co');
const BaseService = require('./base');
const UserORM = require('../model/orm/sys/user');
const RolePrivORM = require('../model/orm/sys/rolePriv');
const PrivORM = require('../model/orm/sys/priv');

module.exports = class PrivilegeService extends BaseService {
  checkUserMenuPriv(userId, path) {
    let self = this;
    let fn = co.wrap(function*(userId, path) {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      //查询role_id
      let role = yield userORM.getUserRoleByUserId(userId);
      //做了封装
      self.checkDBResult(role, '当前用户没有ROLE', 'USER_HAS_NO_ROLE');
      let roleId = role[0]['ROLE_ID'];
      //通过role_id查priv
      let rolePrivORM = new RolePrivORM(connection);
      let privs = yield rolePrivORM.getPrivIdByRoleId(roleId);
      self.checkDBResult(privs, '当前用户没有PRIV', 'USER_HAS_NO_PRIV');
      //得到id的集合
      let privList = [];
      for (let k = 0; k < privs.length; k++) {
        privList.push(privs[k]['PRIV_ID']);
      }
      let privORM = new PrivORM(connection);
      let inRow = privORM.checkPathInPrivs(privList, path);
      return inRow.length !== 0;
    });
    return fn(userId, path);
  }

  getUserMenu(userId) {
    let self = this;
    let fn = co.wrap(function*(userId) {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      //查询role_id
      let role = yield userORM.getUserRoleByUserId(userId);
      //做了封装
      self.checkDBResult(role, '当前用户没有ROLE', 'USER_HAS_NO_ROLE');
      let roleId = role[0]['ROLE_ID'];
      //通过role_id查priv
      let rolePrivORM = new RolePrivORM(connection);
      let privs = yield rolePrivORM.getPrivIdByRoleId(roleId);
      self.checkDBResult(privs, '当前用户没有PRIV', 'USER_HAS_NO_PRIV');
      let privList = [];
      for (let k = 0; k < privs.length; k++) {
        privList.push(privs[k]['PRIV_ID']);
      }
      let privORM = new PrivORM(connection);
      let privsInfo = yield privORM.getPrivsSimpleInfoByIds(privList);
      self.checkDBResult(privsInfo, '权限系统错误', 'SYSTEM_ERROR');
      return privsInfo;
    });
    return fn(userId);
  }
};
