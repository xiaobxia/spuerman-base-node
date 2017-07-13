/**
 * Created by xiaobxia on 2017/7/12.
 */
const errorModel = require('../model/result/errorModel');
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

  saveConnection() {

  }
};
