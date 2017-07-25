/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class RolePrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getAllPrivIdsByRoleId(roleId) {
    return this.query({
      sql: 'SELECT PRIV_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ?',
      values: roleId
    });
  }

  getPrivIdsByRoleId(roleId, start, offset) {
    return this.query({
      sql: 'SELECT PRIV_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ? LIMIT ?,?',
      values: [roleId, start, offset]
    });
  }

  getRolesByPrivId(id) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_role_priv WHERE STATE="A" AND PRIV_ID= ?',
      values: id
    });
  }

  checkPrivInRole(privId, roleId) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ? AND PRIV_ID= ?',
      values: [roleId, privId]
    });
  }

  getRow(privId, roleId) {
    return this.query({
      sql: 'SELECT * FROM sys_role_priv WHERE PRIV_ID=? AND ROLE_ID= ?',
      values: [privId, roleId]
    });
  }

  addPrivToRole(privId, roleId) {
    return this.query({
      sql: 'INSERT INTO sys_role_priv SET STATE="A", PRIV_ID= ?, ROLE_ID= ?',
      values: [privId, roleId]
    });
  }

  enablePrivInRole(privId, roleId) {
    return this.query({
      sql: 'UPDATE sys_role_priv SET STATE="A" WHERE ROLE_ID=? AND PRIV_ID= ?',
      values: [roleId, privId]
    });
  }

  disablePrivInRole(privId, roleId) {
    return this.query({
      sql: 'UPDATE sys_role_priv SET STATE="X" WHERE ROLE_ID=? AND PRIV_ID= ?',
      values: [roleId, privId]
    });
  }
};
