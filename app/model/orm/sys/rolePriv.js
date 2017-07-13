/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class RolePrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }
  getPrivIdByRoleId(roleId) {
    return this.query({
      sql: 'SELECT PRIV_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ?',
      values: roleId
    })
  }
};

// exports.getPrivIdByRoleId = function (connection, roleId, callback) {
//   let query = connection.query(
//     {
//       sql: 'SELECT PRIV_ID FROM sys_role_priv WHERE STATE="A" AND ROLE_ID= ?',
//       values: roleId
//     },
//     callback
//   );
//   logger.trace('sql: ' + query.sql);
// };
