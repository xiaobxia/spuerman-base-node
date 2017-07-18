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
};
