/**
 * Created by xiaobxia on 2017/7/12.
 */
const Parameter = require('../common/validate');
const logger = require('../common/logger');
const config = require('../../config/index');
const BaseResult = require('../model/result/baseResult');
const errorModel = require('../model/result/errorModel');
const sessionConst = require('../model/const/session');
const pool = require('../common/mysqlPool');
const isDebug = config.server.debug;
const p = new Parameter();
module.exports = class BaseController {
  constructor() {
  }

  //方便一个controller条调用多个service,也方便释放
  getPoolConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }

  getSessionUser(session) {
    return session[sessionConst.SESSION_LOGIN_USER];
  }

  setSessionUser(session, user) {
    return session[sessionConst.SESSION_LOGIN_USER] = user;
  }

  validate(rules, data) {
    let msg = p.validate(rules, data);
    if (isDebug === true && msg !== undefined) {
      logger.warn(msg);
    }
    return msg;
  }

  result() {
    return new BaseResult();
  }

  paging(pageIndex, pageSize) {
    let pageIndexT = parseInt(pageIndex),
      pageSizeT = parseInt(pageSize),
      index = isNaN(pageIndexT) ? 1 : pageIndexT,
      size = isNaN(pageSizeT) ? 10 : pageSizeT;
    return {
      pageIndex: index,
      pageSize: size,
      start: (index - 1) * size,
      offset: size
    };
  }

  error(errorMsg, errorCode) {
    return errorModel.baseError(errorMsg, errorCode);
  }

  parameterError(errorMsg, errorCode) {
    return errorModel.parameterError(errorMsg, errorCode);
  }
};
