/**
 * Created by xiaobxia on 2017/7/25.
 */
const BaseORM = require('../base');
module.exports = class ParamORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'sys_param';
  }

  getParamsByIds(ids) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE ID IN (?)`,
      values: [ids]
    });
  }

  getParamById(id) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE ID= ?`,
      values: [id]
    });
  }

  getParams(start, offset) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} LIMIT ?,?`,
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['ID']);
        }
        return this.getParamsByIds(ids);
      }
    });
  }

  getParamsCount() {
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table}`);
  }

  updateParamById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE ID= ?`,
      values: [data, id]
    });
  }

  deleteParamById(id){
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE ID= ?`,
      values: id
    });
  }

  checkExistByCode(code) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} WHERE PARAM_CODE= ?`,
      values: code
    });
  }

  addParam(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data,
    });
  }

  getParamByCode(code) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE PARAM_CODE= ?`,
      values: code
    });
  }
};
