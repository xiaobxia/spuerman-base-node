/**
 * Created by xiaobxia on 2017/7/28.
 */
const co = require('co');
const BaseService = require('./../base');
const AppORM = require('../../model/orm/sys/appORM');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');

module.exports = class AppService extends BaseService {
  getAllApps() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let appORM = new AppORM(connection);
      let result = yield appORM.getAllApps();
      let apps = appORM.dataToHump(result);
      return apps;
    });
    return fn();
  }

  addApp(appInfo) {
    let self = this;
    let fn = co.wrap(function*(appInfo) {
      let connection = self.getConnection();
      let appORM = new AppORM(connection);
      delete appInfo.appId;
      let data = appORM.dataToHyphen(appInfo)
      data['APP_SECRET'] = md5(uuidv4());
      data['STATE'] = 'A';
      let dbResult = yield appORM.addApp(data);
      return dbResult.insertId;
    });
    return fn(appInfo);
  }

  getAppById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let appORM = new AppORM(connection);
      let result = yield appORM.getAppById(id);
      self.checkDBResult(result, '不存在的APP', 'APP_NOT_EXIST');
      return appORM.dataToHump(result)[0];
    });
    return fn(id);
  }

  updateAppById(appInfo) {
    let self = this;
    let fn = co.wrap(function*(appInfo) {
      let connection = self.getConnection();
      let appORM = new AppORM(connection);
      let id = appInfo.appId;
      delete appInfo.appId;
      let data = appORM.dataToHyphen(appInfo);
      yield appORM.updateAppById(id, data);
    });
    return fn(appInfo);
  }

  deleteAppById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let appORM = new AppORM(connection);
      let result = yield appORM.deleteAppById(id);
      if (result.affectedRows === 0) {
        self.throwBaseError('不可删除', 'APP_NOT_EXIST');
      }
    });
    return fn(id);
  }
};
