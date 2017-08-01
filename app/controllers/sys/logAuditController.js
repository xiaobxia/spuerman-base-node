/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const BaseController = require('../base');
const LogAuditService = require('../../service/logAuditService');

module.exports = class LogAuditController extends BaseController {
  /**
   * method get
   * api /sys/logAudit/logAudits
   * @param req
   * @param res
   * @param next
   */
  getLogs() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let logAuditService = new LogAuditService(connection);
        let roles = yield logAuditService.getLogs(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(roles);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/logAudit/logAuditsCount
   * @param req
   * @param res
   * @param next
   */
  getLogsCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let logAuditService = new LogAuditService(connection);
        let count = yield logAuditService.getLogsCount();
        connection.release();
        result.setResult(count);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }
};
