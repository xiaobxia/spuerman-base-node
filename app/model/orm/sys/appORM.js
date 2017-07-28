/**
 * Created by xiaobxia on 2017/7/28.
 */
const BaseORM = require('../base');
module.exports = class AppORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }
  getAllApps() {
    return this.query({
      sql: 'SELECT * FROM sys_app ORDER BY APP_ID DESC',
    });
  }

  addApp(data) {
    return this.query({
      sql: 'INSERT INTO sys_app SET ?',
      values: data
    });
  }
};
