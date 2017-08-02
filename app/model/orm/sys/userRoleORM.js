/**
 * Created by xiaobxia on 2017/7/19.
 */
const BaseORM = require('../base');
module.exports = class UserRoleORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'sys_user_role';
  }

  getUserRoleByUserId(userId) {
    return this.query({
      sql: `SELECT ROLE_ID FROM ${this.table} WHERE STATE="A" AND USER_ID= ?`,
      values: userId
    });
  }

  getUserIdsByRoleId(roleId) {
    return this.query({
      sql: `SELECT USER_ID FROM ${this.table} WHERE STATE="A" AND ROLE_ID= ?`,
      values: roleId
    });
  }

  getRow(userId, roleId) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE USER_ID=? AND ROLE_ID= ?`,
      values: [userId, roleId]
    });
  }

  addUserToRole(userId, roleId) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET STATE="A", USER_ID= ?, ROLE_ID= ?`,
      values: [userId, roleId]
    });
  }

  enableUserInRole(userId, roleId) {
    return this.query({
      sql: `UPDATE ${this.table} SET STATE="A" WHERE USER_ID= ? AND ROLE_ID=?`,
      values: [roleId, userId]
    });
  }

  disableUserInRole(userId, roleId) {
    return this.query({
      sql: `UPDATE ${this.table} SET STATE="X" WHERE USER_ID= ? AND ROLE_ID=?`,
      values: [roleId, userId]
    });
  }
};
