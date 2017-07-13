/**
 * Created by xiaobxia on 2017/6/30.
 */
const moment = require('moment');
const UserSessionORM = require('../model/orm/sys/userSession');
const BaseService = require('./base');

module.exports = class SessionService extends BaseService {
  * saveSession(data) {
    let now = moment().format('YYYY-M-D HH:mm:ss');
    let sessionData = {
      TOKEN: data.token,
      UA: data.ua,
      USER_ID: data.userId,
      STATE: data.userState,
      CREATE_DATE: now,
      LAST_UPDATE_DATE: now
    };
    let connection = this.getConnection();
    let userSessionORM = new UserSessionORM(connection);
    let results = yield userSessionORM.insertSession(sessionData);
    return results;
  }
};
