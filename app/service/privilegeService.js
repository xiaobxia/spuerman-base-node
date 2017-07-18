/**
 * Created by xiaobxia on 2017/6/30.
 */
const co = require('co');
const moment = require('moment');
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
      for (let k = 0, len = privs.length; k < len; k++) {
        privList.push(privs[k]['PRIV_ID']);
      }
      let privORM = new PrivORM(connection);
      let inRow = yield privORM.checkPathInPrivs(privList, path);
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
      for (let k = 0, len = privs.length; k < len; k++) {
        privList.push(privs[k]['PRIV_ID']);
      }
      let privORM = new PrivORM(connection);
      let privsInfo = yield privORM.getPrivsSimpleInfoByIds(privList);
      self.checkDBResult(privsInfo, '权限系统错误', 'SYSTEM_ERROR');
      return privsInfo;
    });
    return fn(userId);
  }

  getPrivsCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let result = yield privORM.getPrivsCount();
      let count = result[0].count;
      return count;
    });
    return fn();
  }

  getPrivById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let result = yield privORM.getPrivById(id);
      self.checkDBResult(result, '不存在的权限', 'PRIV_NOT_EXIST');
      let priv = privORM.dataToHump(result)[0];
      return priv;
    });
    return fn(id);
  }

  getPrivs(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let result = yield privORM.getPrivs(start, offset);
      let roles = privORM.dataToHump(result);
      roles.sort(function (a, b) {
        return a.type - b.type;
      });
      return roles;
    });
    return fn(start, offset);
  }

  getRootPrivs() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let result = yield privORM.getRootPrivs();
      let rootPrivs = privORM.dataToHump(result);
      return rootPrivs;
    });
    return fn();
  }

  addPriv(privInfo) {
    let self = this;
    let fn = co.wrap(function*(privInfo) {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let result = yield privORM.checkExist({'PRIV_CODE': privInfo.privCode});
      if (result.length === 0) {
        let data = privORM.dataToHyphen(privInfo);
        let now = moment().format('YYYY-M-D HH:mm:ss');
        delete data['PRIV_ID'];
        data['STATE'] = 'A';
        data['CREATE_DATE'] = now;
        data['UPDATE_TIME'] = now;
        yield privORM.addPriv(data);
      } else {
        self.throwBaseError('code已存在', 'PRIV_CODE_HAS_EXIST');
      }
    });
    return fn(privInfo);
  }

  updatePriv(privInfo) {
    let self = this;
    let fn = co.wrap(function*(privInfo) {
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let data = privORM.dataToHyphen(privInfo);
      let now = moment().format('YYYY-M-D HH:mm:ss');
      let id = data['PRIV_ID'];
      delete data['PRIV_ID'];
      data['UPDATE_TIME'] = now;
      yield privORM.updatePrivById(id, data);
    });
    return fn(privInfo);
  }

  deletePrivById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let result = null;
      let connection = self.getConnection();
      let privORM = new PrivORM(connection);
      let rolePrivORM = new RolePrivORM(connection);
      result = yield rolePrivORM.getRolesByPrivId(id);
      if (result.length > 0) {
        self.throwBaseError('不可删除', 'PRIV_HAS_ROLE_PRIV_REF');
      } else {
        result = yield privORM.deletePriv({'PRIV_ID': id});
        if (result.affectedRows === 0) {
          self.throwBaseError('不可删除', 'PRIV_NOT_EXIST');
        }
      }
    });
    return fn(id);
  }
};
