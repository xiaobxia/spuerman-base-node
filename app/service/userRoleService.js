/**
 * Created by xiaobxia on 2017/7/21.
 */
const co = require('co');
const BaseService = require('./base');
const UserRoleORM = require('../model/orm/sys/userRoleORM');

module.exports = class UserRoleService extends BaseService {
  addUserToRole(userId, roleId) {
    let self = this;
    let fn = co.wrap(function*(userId, roleId) {
      let connection = self.getConnection();
      let userRoleORM = new UserRoleORM(connection);
      let row = yield userRoleORM.getRow(userId, roleId);
      if (row.length !== 0) {
        if (row[0]['STATE'] === 'X') {
          yield userRoleORM.enableUserInRole(userId, roleId);
        } else {
          self.throwBaseError('已存在', 'ROLEUSER_HAS_EXIST');
        }
      } else {
        let dbResult = yield userRoleORM.addUserToRole(userId, roleId);
        return dbResult.insertId;
      }
    });
    return fn(userId, roleId);
  }

  deleteUserInRole(userId, roleId) {
    let self = this;
    let fn = co.wrap(function*(userId, roleId) {
      let connection = self.getConnection();
      let userRoleORM = new UserRoleORM(connection);
      let dbResult = yield userRoleORM.disableUserInRole(userId, roleId);
      if (dbResult.affectedRows === 0) {
        self.throwBaseError('不可删除', 'PRIV_NOT_EXIST_ROLE');
      }
    });
    return fn(userId, roleId);
  }
};
