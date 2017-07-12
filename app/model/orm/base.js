/**
 * Created by xiaobxia on 2017/7/12.
 */
const logger = require('../../common/logger');
const config = require('../../../config/index');
const isDebug = config.server.debug;
module.exports = class supermanORM {
  constructor(connection) {
    //虽然会是为空但是也没有关系
    this.connection = connection;
  }
  saveConnection(connection) {
    this.connection = connection;
  }
  getConnection(){
    return this.connection;
  }
  tranceSql(sql) {
    if (isDebug) {
      logger.trace('sql: ' + sql)
    }
  }
};
