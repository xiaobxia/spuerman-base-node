/**
 * Created by xiaobxia on 2017/7/17.
 */
const co = require('co');
const BaseService = require('./../base');
const RoleORM = require('../../model/orm/sys/roleORM');
const UserRoleORM = require('../../model/orm/sys/userRoleORM');
const RolePrivORM = require('../../model/orm/sys/rolePrivORM');
const clone = require('../../../util/object').clone;

module.exports = class RoleService extends BaseService {
  getRolesCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.getRolesCount();
      return result[0].count;
    });
    return fn();
  }

  getRoles(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.getRoles(start, offset);
      return roleORM.dataToHump(result);
    });
    return fn(start, offset);
  }

  getRolesByUserId(userId) {
    let self = this;
    let fn = co.wrap(function*(userId) {
      let connection = self.getConnection();
      let userRoleORM = new UserRoleORM(connection);
      let roleORM = new RoleORM(connection);
      let dbResult = yield userRoleORM.getUserRoleByUserId(userId);
      self.checkDBResult(dbResult, '当前用户没有ROLE', 'USER_HAS_NO_ROLE');
      let roleId = dbResult[0]['ROLE_ID'];
      let role = yield roleORM.getRoleById(roleId);
      return roleORM.dataToHump(role);
    });
    return fn(userId);
  }

  addRole(roleInfo) {
    let self = this;
    let fn = co.wrap(function*(roleInfo) {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.checkExistByCode(roleInfo.roleCode);
      if (result.length === 0) {
        let data = roleORM.dataToHyphen(roleInfo);
        delete data['ROLE_ID'];
        data['STATE'] = 'A';
        let dbResult = yield roleORM.addRole(data);
        return dbResult.insertId;
      } else {
        self.throwBaseError('code已存在', 'ROLE_CODE_HAS_EXIST');
      }
    });
    return fn(roleInfo);
  }

  getRoleById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.getRoleById(id);
      self.checkDBResult(result, '不存在的角色', 'ROLE_NOT_EXIST');
      return roleORM.dataToHump(result)[0];
    });
    return fn(id);
  }

  updateRole(roleInfo) {
    let self = this;
    let fn = co.wrap(function*(roleInfo) {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let id = roleInfo['roleId'];
      roleInfo = clone(roleInfo, function (key, target) {
        let keys = ['roleId', 'state', 'createDate', 'updateDate'];
        return (keys.indexOf(key) === -1 && (target[key] || target[key] === 0));
      });
      let data = roleORM.dataToHyphen(roleInfo);
      yield roleORM.updateRoleById(id, data);
    });
    return fn(roleInfo);
  }

  deleteRoleById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let userRoleORM = new UserRoleORM(connection);
      let result = yield userRoleORM.getUserIdsByRoleId(id);
      if (result.length > 0) {
        self.throwBaseError('不可删除', 'ROLE_HAS_USER_ROLE_REF');
      }
      let rolePrivORM = new RolePrivORM(connection);
      result = yield rolePrivORM.getAllPrivIdsByRoleId(id);
      if (result.length > 0) {
        self.throwBaseError('不可删除', 'PRIV_HAS_ROLE_PRIV_REF');
      }
      let roleORM = new RoleORM(connection);
      result = yield roleORM.deleteRoleById(id);
      if (result.affectedRows === 0) {
        self.throwBaseError('不可删除', 'ROLE_NOT_EXIST');
      }
    });
    return fn(id);
  }
};
