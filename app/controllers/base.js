/**
 * Created by xiaobxia on 2017/7/12.
 */
const Parameter = require('parameter');
const logger = require('../common/logger');
const config = require('../../config/index');
const BaseResult = require('../model/result/baseResult');
const sessionConst = require('../model/const/session');
const isDebug = config.server.debug;
const p = new Parameter();
module.exports = class ControllerBase {
  constructor() {
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
      logger.warn(msg)
    }
    return msg;
  }
  result(){
    return new BaseResult();
  }
  pagging(pageIndex, pageSize) {
    let pageIndexT = parseInt(pageIndex),
      pageSizeT = parseInt(pageSize),
      index = isNaN(pageIndexT) ? 1 : pageIndexT,
      size = isNaN(pageSizeT) ? 10 : pageSizeT;
    return {
      pageIndex: index,
      pageSize: size,
      start: (index - 1) * size,
      offset: size
    }
  }
};
