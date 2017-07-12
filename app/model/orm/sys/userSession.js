/**
 * Created by xiaobxia on 2017/6/30.
 */
const logger = require('../../../common/logger');
const baseORM = require('../base');
module.exports = class userSession extends baseORM {
  constructor(connection) {
    super(connection);
  }

  insertSession(data) {
    let connection = this.getConnection();
    let query = connection.query(
      {
        sql: 'INSERT INTO sys_user_session SET ?',
        values: data
      },
      function (error, results, fields) {
      });
    this.tranceSql(query.sql);
  }
};
module.exports = {
  //callback(error, results, fields)
  insertSession: function (connection, data, callback) {
    let query = connection.query(
      {
        sql: 'INSERT INTO sys_user_session SET ?',
        values: data
      },
      callback
    );
    logger.trace('sql: ' + query.sql);
  }
}
