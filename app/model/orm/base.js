/**
 * Created by xiaobxia on 2017/7/12.
 */
const logger = require('../../common/logger');
const config = require('../../../config/index');
module.exports = class supermanORM {
  constructor() {

  }

  tranceSql(sql) {
    if (config.server.debug) {
      logger.trace('sql: ' + sql)
    }
  }
};
