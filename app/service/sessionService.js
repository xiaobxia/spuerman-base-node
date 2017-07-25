/**
 * Created by xiaobxia on 2017/6/30.
 */
const co = require('co');
const moment = require('moment');
const UserSessionORM = require('../model/orm/sys/userSessionORM');
const BaseService = require('./base');

module.exports = class SessionService extends BaseService {
  saveSession(data) {
    let self = this;
    let fn = co.wrap(function* (data) {
      let now = moment().format('YYYY-M-D HH:mm:ss');
      let sessionData = {
        TOKEN: data.token,
        UA: data.ua,
        USER_ID: data.userId,
        STATE: data.userState,
        CREATE_DATE: now,
        LAST_UPDATE_DATE: now
      };
      let connection = self.getConnection();
      let userSessionORM = new UserSessionORM(connection);
      yield userSessionORM.insertSession(sessionData);
    });
    return fn(data);
  }
};
