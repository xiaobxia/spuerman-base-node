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
};
