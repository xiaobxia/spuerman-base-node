/**
 * Created by xiaobxia on 2017/6/30.
 */
const moment = require('moment');
const pool = require('../common/mysqlPool');
const logger = require('../common/logger');
const sessionORM = require('../model/orm/sys/userSession');
const errorModel = require('../model/result/errorModel');
module.exports = function (user, token, ua, callback) {
  let now = moment().format('YYYY-M-D HH:mm:ss');
  let data = {
    TOKEN: token,
    UA: ua,
    USER_ID: user['USER_ID'],
    STATE: user['STATE'],
    CREATE_DATE: now,
    LAST_UPDATE_DATE: now
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      logger.error(error);
      callback(errorModel.dbError(error.code));
    } else {
      sessionORM.insertSession(connection, data, function (error, results, fields) {
        connection.release();
        if (error) {
          logger.error(error);
          callback(errorModel.dbError(error.code))
        } else {
          callback(null, data)
        }
      })
    }
  });
}
