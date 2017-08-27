/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class RolePrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_ROLE_PRIV';
  }

  getAllPrivIdsByRoleId(roleId) {
    return this.query({
      sql: `SELECT PRIV_ID FROM ${this.table} WHERE STATE="A" AND ROLE_ID= ?`,
      values: roleId
    });
  }

  getPrivIdsByRoleId(roleId, start, offset) {
    return this.query({
      sql: `SELECT PRIV_ID FROM ${this.table} WHERE STATE="A" AND ROLE_ID= ? LIMIT ?,?`,
      values: [roleId, start, offset]
    });
  }

  getRolesByPrivId(id) {
    return this.query({
      sql: `SELECT ROLE_ID FROM ${this.table} WHERE STATE="A" AND PRIV_ID= ?`,
      values: id
    });
  }

  checkPrivInRole(privId, roleId) {
    return this.query({
      sql: `SELECT ROLE_ID FROM ${this.table} WHERE STATE="A" AND PRIV_ID= ? AND ROLE_ID= ?`,
      values: [roleId, privId]
    });
  }

  getRow(privId, roleId) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE PRIV_ID=? AND ROLE_ID= ?`,
      values: [privId, roleId]
    });
  }

  addPrivToRole(privId, roleId) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET STATE="A", PRIV_ID= ?, ROLE_ID= ?`,
      values: [privId, roleId]
    });
  }

  enablePrivInRole(privId, roleId) {
    return this.query({
      sql: `UPDATE ${this.table} SET STATE="A" WHERE PRIV_ID= ? AND ROLE_ID=?`,
      values: [roleId, privId]
    });
  }

  disablePrivInRole(privId, roleId) {
    return this.query({
      sql: `UPDATE ${this.table} SET STATE="X" WHERE PRIV_ID= ? AND ROLE_ID=?`,
      values: [roleId, privId]
    });
  }
};
