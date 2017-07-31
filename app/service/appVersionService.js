/**
 * Created by xiaobxia on 2017/7/31.
 */
const co = require('co');
const BaseService = require('./base');
const AppVersionORM = require('../model/orm/sys/appVersionORM');

module.exports = class AppVersionService extends BaseService {
  getAppVersionsCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let appVersionORM = new AppVersionORM(connection);
      let result = yield appVersionORM.getVersionsCount();
      return result[0].count;
    });
    return fn();
  }

  getAppVersions(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let appVersionORM = new AppVersionORM(connection);
      let result = yield appVersionORM.getVersions(start, offset);
      return appVersionORM.dataToHump(result);
    });
    return fn(start, offset);
  }

  addAppVersion(appVersionInfo) {
    let self = this;
    let fn = co.wrap(function*(appVersionInfo) {
      let connection = self.getConnection();
      let appVersionORM = new AppVersionORM(connection);
      let result = yield appVersionORM.checkExistByNumber(appVersionInfo.appId, appVersionInfo.versionNumber);
      if (result.length === 0) {
        delete appVersionInfo.versionId;
        delete appVersionInfo.appName;
        appVersionInfo.forceUpdate = appVersionInfo.forceUpdate === 'true' ? 1 : 0;
        let data = appVersionORM.dataToHyphen(appVersionInfo);
        let dbResult = yield appVersionORM.addVersion(data);
        return dbResult.insertId;
      } else {
        self.throwBaseError('version已存在', 'VERSION_HAS_EXIST');
      }
    });
    return fn(appVersionInfo);
  }

  updateAppVersion(versionInfo) {
    let self = this;
    let fn = co.wrap(function*(versionInfo) {
      let connection = self.getConnection();
      let appVersionORM = new AppVersionORM(connection);
      let id = versionInfo.versionId;
      delete versionInfo.appName;
      let data = appVersionORM.dataToHyphen(versionInfo);
      yield appVersionORM.updateVersionById(id, data);
    });
    return fn(versionInfo);
  }

  deleteParamById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let appVersionORM = new AppVersionORM(connection);
      let result = yield appVersionORM.deleteVersionById(id);
      if (result.affectedRows === 0) {
        self.throwBaseError('不可删除', 'VERSION_NOT_EXIST');
      }
    });
    return fn(id);
  }
};
