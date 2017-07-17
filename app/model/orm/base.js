/**
 * Created by xiaobxia on 2017/7/12.
 */
const logger = require('../../common/logger');
const config = require('../../../config/index');
const isDebug = config.server.debug;
module.exports = class BaseORM {
  constructor(connection) {
    //虽然会是为空但是也没有关系
    this.connection = connection;
  }

  saveConnection(connection) {
    this.connection = connection;
  }

  getConnection() {
    return this.connection;
  }

  query(sqlOption) {
    let self = this;
    let connection = this.getConnection();
    return new Promise((resolve, reject) => {
      let query = connection.query(
        sqlOption,
        (error, results, fields) => {
          if (error) {
            //打印错误比不打印花费3倍的时间
            logger.error(error.stack);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
      self.tranceSql(query.sql);
    });
  }

  tranceSql(sql) {
    if (isDebug) {
      logger.trace('sql: ' + sql);
    }
  }

  dataToHump(data) {
    let tempData = [];
    for (let k = 0, len = data.length; k < len; k++) {
      let tempItem = {};
      for (let str in data[k]) {
        let strArr = str.split('_');
        strArr[0] = strArr[0].toLowerCase();
        for (let i = 1, len2 = strArr.length; i < len2; i++) {
          let strTemp = strArr[i].toLowerCase();
          strArr[i] = strTemp.charAt(0).toUpperCase() + strTemp.substring(1);
        }
        tempItem[strArr.join('')] = data[k][str];
      }
      tempData.push(tempItem);
    }
    return tempData;
  }
};
