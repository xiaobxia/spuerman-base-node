/**
 * Created by xiaobxia on 2017/7/17.
 */
const co = require('co');
const BaseService = require('./base');
const RoleORM = require('../model/orm/sys/role');
const UserRoleORM = require('../model/orm/sys/userRole');

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
};
