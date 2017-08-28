/**
 * Created by xiaobxia on 2017/7/24.
 */
const BaseORM = require('../base');
module.exports = class LogAuditORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_LOG_AUDIT';
    this.primaryKey = 'ID';
    // this.allField = ['ID', 'LOG_TYPE', 'USER_ID', 'CREATE_DATE', 'DESCRIPTION'];
    // this.baseField = ['ID', 'LOG_TYPE', 'CREATE_DATE', 'DESCRIPTION'];
  }

  addLog(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data
    });
  }

  getLogsCount() {
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table}`);
  }

  getLogsByIds(ids) {
    return this.query({
      sql: `SELECT ?? FROM ${this.table} AS la LEFT JOIN SYS_USER AS u ON u.USER_ID=la.USER_ID WHERE ID IN (?)`,
      values: [['la.*', 'u.USER_ID'], ids]
    });
  }

  getLogs(start, offset) {
    return this.query({
      sql: `SELECT ID FROM ${this.table} ORDER BY ID DESC LIMIT ?,?`,
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['ID']);
        }
        return this.getLogsByIds(ids);
      }
    });
  }
};
