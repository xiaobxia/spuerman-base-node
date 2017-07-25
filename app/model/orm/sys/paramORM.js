/**
 * Created by xiaobxia on 2017/7/25.
 */
const BaseORM = require('../base');
module.exports = class ParamORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getParamsByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_param WHERE ID IN (?)',
      values: [ids]
    });
  }

  getParams(start, offset) {
    return this.query({
      sql: 'SELECT ID FROM sys_param ORDER BY ID DESC LIMIT ?,?',
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
    return this.query('SELECT COUNT(*) AS count FROM sys_param');
  }

  updateParamById(id, data) {
    return this.query({
      sql: 'UPDATE sys_param SET ? WHERE ID= ?',
      values: [data, id]
    });
  }

  deleteParamById(id){
    return this.query({
      sql: 'DELETE FROM sys_param WHERE ID= ?',
      values: id
    });
  }

  checkExistByCode(code) {
    return this.query({
      sql: 'SELECT ID FROM sys_param WHERE PARAM_CODE= ?',
      values: code
    });
  }

  addParam(data) {
    return this.query({
      sql: 'INSERT INTO sys_param SET ?',
      values: data,
    });
  }

  getParamByCode(code) {
    return this.query({
      sql: 'SELECT * FROM sys_param WHERE PARAM_CODE= ?',
      values: code
    });
  }
};
