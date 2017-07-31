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
      sql: 'SELECT * FROM sys_app',
    });
  }

  addApp(data) {
    return this.query({
      sql: 'INSERT INTO sys_app SET ?',
      values: data
    });
  }

  getAppById(id) {
    return this.query({
      sql: 'SELECT * FROM sys_app WHERE APP_ID= ?',
      values: [id]
    });
  }

  updateAppById(id, data) {
    return this.query({
      sql: 'UPDATE sys_app SET ? WHERE APP_ID= ?',
      values: [data, id]
    });
  }

  deleteAppById(id){
    return this.query({
      sql: 'DELETE FROM sys_app WHERE APP_ID= ?',
      values: id
    });
  }
};
