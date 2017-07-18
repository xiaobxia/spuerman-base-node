/**
 * Created by xiaobxia on 2017/7/17.
 */
const co = require('co');
const BaseService = require('./base');
const RoleORM = require('../model/orm/sys/role');

module.exports = class RoleService extends BaseService{
  getRolesCount () {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.getRolesCount();
      let count = result[0].count;
      return count;
    });
    return fn();
  }

  getRoles(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let roleORM = new RoleORM(connection);
      let result = yield roleORM.getRoles(start, offset);
      let roles = roleORM.dataToHump(result);
      return roles;
    });
    return fn(start, offset);
  }
};
