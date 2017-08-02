/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseORM = require('../base');
module.exports = class PrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'sys_priv';
  }

  getPrivById(id) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE PRIV_ID=?`,
      values: id
    });
  }

  getPrivsByIds(ids) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE PRIV_ID IN (?) ORDER BY TYPE`,
      //你传进数据会被认为是多个变量
      values: [ids]
    });
  }

  getPrivsCount() {
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE STATE="A"`);
  }

  getPrivs(start, offset) {
    return this.query({
      sql: `SELECT PRIV_ID FROM ${this.table} WHERE STATE="A" ORDER BY TYPE , PRIV_ID LIMIT ?,?`,
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
      sql: `SELECT * FROM ${this.table} WHERE STATE="A" AND TYPE="0"`,
    });
  }

  getPrivsSimpleInfoByIds(ids) {
    return this.query({
      sql: `SELECT ?? FROM ${this.table} WHERE TYPE!="2" AND STATE="A" AND PRIV_ID IN (?) ORDER BY PRIV_NAME`,
      values: [['PRIV_ID', 'PARENT_PRIV_ID', 'PRIV_NAME', 'TYPE', 'URL', 'PATH'], ids]
    });
  }

  checkPathInPrivs(privIds, path) {
    return this.query({
      sql: `SELECT PRIV_ID FROM ${this.table} WHERE STATE="A" AND PATH=? AND PRIV_ID IN (?)`,
      values: [path, privIds]
    });
  }

  addPriv(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data
    });
  }

  updatePrivById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE PRIV_ID= ?`,
      values: [data, id]
    });
  }

  deletePrivById(privId) {
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE PRIV_ID= ?`,
      values: privId
    });
  }

  checkExistByCode(code) {
    return this.query({
      sql: `SELECT PRIV_ID FROM ${this.table} WHERE STATE="A" AND PRIV_CODE= ?`,
      values: code
    });
  }
};
