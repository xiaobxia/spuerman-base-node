/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class UserSessionORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_USER_SESSION';
  }

  insertSession(sessionData) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: sessionData
    });
  }
};
