/**
 * Created by xiaobxia on 2017/7/12.
 */
const errorModel = require('../model/result/errorModel');
const logger = require('../common/logger');
const config = require('../../config/index');
const isDebug = config.server.debug;
module.exports = class BaseService {
  constructor(connection) {
    this.connection = connection;
  }

  getConnection() {
    return this.connection;
  }

  //支持提前释放
  release() {
    this.connection.release();
  }

  throwBaseError(errorMsg, errorCode) {
    throw errorModel.baseError(errorMsg, errorCode);
  }

  checkDBResult(result, errorMsg, errorCode) {
    if (!result.length) {
      this.throwBaseError(errorMsg, errorCode);
    }
  }

  loggerWarn(text) {
    if (isDebug) {
      logger.warn(text);
    }
  }

  loggerError(text) {
    logger.error(text);
  }

  saveConnection() {

  }
};
