/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class UserSessionORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  insertSession(sessionData) {
    return this.query({
      sql: 'INSERT INTO sys_user_session SET ?',
      values: sessionData
    });
  }
};
