/**
 * Created by xiaobxia on 2017/7/31.
 */
const BaseORM = require('../base');
module.exports = class AppVersionORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getVersionByIds(ids) {
    return this.query({
      sql: 'SELECT ?? FROM sys_app_version AS ap LEFT JOIN sys_app AS a ON a.APP_ID=ap.APP_ID WHERE VERSION_ID IN (?)',
      values: [['a.APP_NAME', 'ap.*'], ids]
    });
  }

  getVersions(start, offset) {
    return this.query({
      sql: 'SELECT VERSION_ID FROM sys_app_version WHERE STATE="A" LIMIT ?,?',
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
    return this.query('SELECT COUNT(*) AS count FROM sys_app_version WHERE STATE="A"');
  }

  addVersion(data) {
    return this.query({
      sql: 'INSERT INTO sys_app_version SET ?',
      values: data,
    });
  }

  checkExistByNumber(appId, number) {
    return this.query({
      sql: 'SELECT VERSION_ID FROM sys_app_version WHERE STATE="A" AND APP_ID=? AND VERSION_NUMBER= ?',
      values: [appId, number]
    });
  }

  updateVersionById(id, data) {
    return this.query({
      sql: 'UPDATE sys_app_version SET ? WHERE VERSION_ID= ?',
      values: [data, id]
    });
  }

  deleteVersionById(id) {
    return this.query({
      sql: 'DELETE FROM sys_app_version WHERE VERSION_ID= ?',
      values: id
    });
  }
};
