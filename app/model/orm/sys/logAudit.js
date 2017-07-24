/**
 * Created by xiaobxia on 2017/7/24.
 */
const BaseORM = require('../base');
module.exports = class LogAuditORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  addLog(data) {
    return this.query({
      sql: 'INSERT INTO sys_log_audit SET ?',
      values: data
    });
  }

  getLogsCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_log_audit');
  }

  getLogsByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_log_audit WHERE ID IN (?)',
      values: [ids]
    });
  }

  getLogs(start, offset) {
    return this.query({
      sql: 'SELECT ID FROM sys_log_audit ORDER BY ID DESC LIMIT ?,?',
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
