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
};
