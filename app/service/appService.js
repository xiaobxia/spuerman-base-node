/**
 * Created by xiaobxia on 2017/7/28.
 */
const co = require('co');
const BaseService = require('./base');
const AppORM = require('../model/orm/sys/appORM');
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
};
