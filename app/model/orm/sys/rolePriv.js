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
};
