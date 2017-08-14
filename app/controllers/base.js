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

  /**
   * 得到session中的user
   * @param session
   * @returns {*}
   */
  getSessionUser(session) {
    return session[sessionConst.SESSION_LOGIN_USER];
  }

  /**
   * 设置session中的user
   * @param session
   * @param user
   * @returns {*}
   */
  setSessionUser(session, user) {
    return session[sessionConst.SESSION_LOGIN_USER] = user;
  }

  result() {
    return new BaseResult();
  }

  throwBaseError(errorMsg, errorCode) {
    throw errorModel.baseError(errorMsg, errorCode);
  }

  /**
   * 抛出参数错误
   * errorType是parameter
   * @param errorMsg
   * @param errorCode
   * @returns {*}
   */
  throwParameterError(errorMsg, errorCode) {
    throw errorModel.baseError(errorMsg, errorCode, 'parameter');
  }

  /**
   * 校验请求参数
   * @param rules
   * @param data
   * @returns {Object}
   */
  validate(rules, data) {
    let msgList = p.validate(rules, data);
    if (msgList !== undefined) {
      if (isDebug === true) {
        logger.warn(msgList);
      }
      let msg = msgList[0];
      return this.throwParameterError(msg.field + ' ' + msg.message, msg.code);
    }
  }

  /**
   * 分页初始化
   * @param pageIndex
   * @param pageSize
   * @param defaultValue
   * @returns {{pageIndex: *, pageSize: *, start: number, offset: *}}
   */
  paging(pageIndex, pageSize, defaultValue) {
    let defaultPageIndex = 0,
      defaultPageSize = 0;
    if (defaultValue) {
      defaultPageIndex = defaultValue.pageIndex ? defaultValue.pageIndex : 1;
      defaultPageSize = defaultValue.pageSize ? defaultValue.pageSize : 20;
    }
    //得是个整数
    let pageIndexT = parseInt(pageIndex, 10),
      pageSizeT = parseInt(pageSize, 10),
      index = isNaN(pageIndexT) ? defaultPageIndex : pageIndexT,
      size = isNaN(pageSizeT) ? defaultPageSize : pageSizeT;
    return {
      pageIndex: index,
      pageSize: size,
      start: (index - 1) * size,
      offset: size
    };
  }

  /**
   * 得到连接
   * 方便一个controller条调用多个service,也方便释放
   * @returns {Promise}
   */
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

  /**
   * 开始事务
   * @param connection
   * @returns {Promise}
   */
  beginTransaction(connection) {
    return new Promise(function (resolve, reject) {
      connection.beginTransaction(function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * 提交事务修改
   * @param connection
   * @returns {Promise}
   */
  commit(connection) {
    return new Promise(function (resolve, reject) {
      connection.commit(function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};
