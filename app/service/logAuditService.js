/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const BaseService = require('./base');
const LogAuditORM = require('../model/orm/sys/logAudit');


module.exports = class LogAuditService extends BaseService {
  addLog(type, userId, description) {
    let self = this;
    let fn = co.wrap(function*(type, userId, description) {
      let connection = self.getConnection();
      let logAuditORM = new LogAuditORM(connection);
      yield logAuditORM.addLog({'LO_TYPE': type, 'USER_ID': userId, 'DESCRIPTION': description});
    });
    return fn(type, userId, description);
  }
};
