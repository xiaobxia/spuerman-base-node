/**
 * Created by xiaobxia on 2017/7/31.
 */
const BaseORM = require('../base');
module.exports = class AppVersionORM extends BaseORM {
  constructor(connection) {
    super(connection);
    this.table = 'SYS_APP_VERSION';
  }

  getVersionByIds(ids) {
    return this.query({
      sql: 'SELECT ?? FROM SYS_APP_VERSION AS ap LEFT JOIN SYS_APP AS a ON a.APP_ID=ap.APP_ID WHERE VERSION_ID IN (?)',
      values: [['a.APP_NAME', 'ap.*'], ids]
    });
  }

  getVersions(start, offset) {
    return this.query({
      sql: `SELECT VERSION_ID FROM ${this.table} WHERE STATE="A" LIMIT ?,?`,
      values: [start, offset]
    }).then((results) => {
      if (!results.length) {
        //为空的话直接返回空数组
        return results;
      } else {
        let ids = [];
        for (let k = 0, len = results.length; k < len; k++) {
          ids.push(results[k]['VERSION_ID']);
        }
        return this.getVersionByIds(ids);
      }
    });
  }

  getVersionsCount() {
    return this.query(`SELECT COUNT(*) AS count FROM ${this.table} WHERE STATE="A"`);
  }

  addVersion(data) {
    return this.query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data,
    });
  }

  checkExistByNumber(appId, number) {
    return this.query({
      sql: `SELECT VERSION_ID FROM ${this.table} WHERE STATE="A" AND VERSION_NUMBER= ? AND APP_ID=?`,
      values: [appId, number]
    });
  }

  updateVersionById(id, data) {
    return this.query({
      sql: `UPDATE ${this.table} SET ? WHERE VERSION_ID= ?`,
      values: [data, id]
    });
  }

  deleteVersionById(id) {
    return this.query({
      sql: `DELETE FROM ${this.table} WHERE VERSION_ID= ?`,
      values: id
    });
  }
};
