/**
 * Created by xiaobxia on 2017/7/28.
 */
const BaseORM = require('../base');
module.exports = class AppORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_APP';
  }
  getAllApps() {
    return this.query({
      sql: `SELECT * FROM ${this.table}`,
    });
  }

  addApp(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data
    });
  }

  getAppById(id) {
    return this.query({
      sql: `SELECT * FROM ${this.table} WHERE APP_ID= ?`,
      values: [id]
    });
  }

  updateAppById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE APP_ID= ?`,
      values: [data, id]
    });
  }

  deleteAppById(id){
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE APP_ID= ?`,
      values: id
    });
  }
};
