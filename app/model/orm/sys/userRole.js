/**
 * Created by xiaobxia on 2017/7/19.
 */
const BaseORM = require('../base');
module.exports = class UserRoleORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getUserRoleByUserId(userId) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE="A"',
      values: userId
    });
  }

  getUserIdsByRoleId(roleId) {
    return this.query({
      sql: 'SELECT USER_ID FROM sys_user_role WHERE ROLE_ID= ?',
      values: roleId
    });
  }
};
