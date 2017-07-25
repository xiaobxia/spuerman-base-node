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
      sql: 'SELECT USER_ID FROM sys_user_role WHERE STATE="A" AND ROLE_ID= ?',
      values: roleId
    });
  }

  getRow(userId, roleId) {
    return this.query({
      sql: 'SELECT * FROM sys_user_role WHERE USER_ID=? AND ROLE_ID= ?',
      values: [userId, roleId]
    });
  }

  addUserToRole(userId, roleId) {
    return this.query({
      sql: 'INSERT INTO sys_user_role SET STATE="A", USER_ID= ?, ROLE_ID= ?',
      values: [userId, roleId]
    });
  }

  enableUserInRole(userId, roleId) {
    return this.query({
      sql: 'UPDATE sys_user_role SET STATE="A" WHERE ROLE_ID=? AND USER_ID= ?',
      values: [roleId, userId]
    });
  }

  disableUserInRole(userId, roleId) {
    return this.query({
      sql: 'UPDATE sys_user_role SET STATE="X" WHERE ROLE_ID=? AND USER_ID= ?',
      values: [roleId, userId]
    });
  }
};
