/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseORM = require('../base');
module.exports = class PrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getPrivsByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_priv WHERE PRIV_ID IN (?)',
      //你传进数据会被认为是多个变量
      values: [ids]
    });
  }

  getPrivsCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_priv WHERE STATE="A"');
  }

  getPrivs(start, offset) {
    return this.query({
      sql: 'SELECT PRIV_ID FROM sys_priv WHERE STATE="A" LIMIT ?,?',
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        //为空的话直接返回空数组
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['PRIV_ID']);
        }
        return this.getPrivsByIds(ids);
      }
    });
  }

  getRootPrivs() {
    return this.query({
      sql: 'SELECT * FROM sys_priv WHERE STATE="A" AND TYPE="0"',
    });
  }

  getPrivsSimpleInfoByIds(ids) {
    return this.query({
      sql: 'SELECT ?? FROM sys_priv WHERE TYPE!="2" AND STATE="A" AND PRIV_ID IN (?)',
      values: [['PRIV_ID', 'PARENT_PRIV_ID', 'PRIV_NAME', 'TYPE', 'URL', 'PATH'], ids]
    });
  }

  checkPathInPrivs(privIds, path) {
    return this.query({
      sql: 'SELECT 1 FROM sys_priv WHERE STATE="A" AND PATH=? AND PRIV_ID IN (?)',
      values: [path, privIds]
    });
  }

  addPriv(data) {
    return this.query({
      sql: 'INSERT INTO sys_priv SET ?',
      values: data
    });
  }

  deletePriv(where) {
    return this.query({
      sql: 'DELETE FROM sys_priv WHERE ?',
      values: where
    });
  }
};
