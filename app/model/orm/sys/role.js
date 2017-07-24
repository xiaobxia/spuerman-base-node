/**
 * Created by xiaobxia on 2017/7/17.
 */
const BaseORM = require('../base');
module.exports = class RoleORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getRolesByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_role WHERE ROLE_ID IN (?)',
      //你传进数据会被认为是多个变量
      values: [ids]
    });
  }

  getRolesCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_role WHERE STATE="A"');
  }

  getRoles(start, offset) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_role WHERE STATE="A" LIMIT ?,?',
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        //为空的话直接返回空数组
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['ROLE_ID']);
        }
        return this.getRolesByIds(ids);
      }
    });
  }

  getRoleById(id) {
    return this.query({
      sql: 'SELECT * FROM sys_role WHERE ROLE_ID= ?',
      values: [id]
    });
  }

  checkExistByCode(code) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_role WHERE STATE="A" AND ROLE_CODE= ?',
      values: code
    });
  }

  addRole(data) {
    return this.query({
      sql: 'INSERT INTO sys_role SET ?',
      values: data
    });
  }

  updateRoleById(id, data) {
    return this.query({
      sql: 'UPDATE sys_role SET ? WHERE ROLE_ID= ?',
      values: [data, id]
    });
  }

  deleteRoleById(roleId) {
    return this.query({
      sql: 'DELETE FROM sys_role WHERE ROLE_ID= ?',
      values: roleId
    });
  }
};
