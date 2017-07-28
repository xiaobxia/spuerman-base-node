/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const BaseService = require('./base');
const LogAuditORM = require('../model/orm/sys/logAuditORM');

module.exports = class LogAuditService extends BaseService {
  addLog(type, userId, description) {
    let self = this;
    let fn = co.wrap(function*(type, userId, description) {
      let connection = self.getConnection();
      let logAuditORM = new LogAuditORM(connection);
      let dbResult = yield logAuditORM.addLog({'LOG_TYPE': type, 'USER_ID': userId, 'DESCRIPTION': description});
      return dbResult.insertId;
    });
    return fn(type, userId, description);
  }

  getLogs(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let logAuditORM = new LogAuditORM(connection);
      let result = yield logAuditORM.getLogs(start, offset);
      let logs = logAuditORM.dataToHump(result);
      logs.sort(function (a, b) {
        return b.id - a.id;
      });
      return logs;
    });
    return fn(start, offset);
  }

  getLogsCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let logAuditORM = new LogAuditORM(connection);
      let result = yield logAuditORM.getLogsCount();
      return result[0].count;
    });
    return fn();
  }
};
