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

  getConnection() {
    return this.connection;
  }

  /**
   * mysql查询
   * @param sqlOption
   * @returns {Promise}
   */
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

  /**
   * 打印sql语句
   * @param sql
   */
  tranceSql(sql) {
    if (isDebug) {
      logger.trace('sql: ' + sql);
    }
  }

  /**
   * 连字符转驼峰
   * @param data
   * @returns {Array}
   */
  dataToHump(data) {
    let tempData = [];
    for (let k = 0, len = data.length; k < len; k++) {
      let tempItem = {};
      for (let str in data[k]) {
        if (data[k].hasOwnProperty(str)) {
          let strArr = str.split('_');
          strArr[0] = strArr[0].toLowerCase();
          for (let i = 1, len2 = strArr.length; i < len2; i++) {
            let strTemp = strArr[i].toLowerCase();
            strArr[i] = strTemp.charAt(0).toUpperCase() + strTemp.substring(1);
          }
          tempItem[strArr.join('')] = data[k][str];
        }
      }
      tempData.push(tempItem);
    }
    return tempData;
  }

  /**
   * 驼峰转连字符
   * @param data
   * @returns {{}}
   */
  dataToHyphen(data) {
    let tempItem = {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let newKey = '';
        newKey = key.replace(/([A-Z])/g, "_$1").toUpperCase();
        tempItem[newKey] = data[key];
      }
    }
    return tempItem;
  }

  formatWhere(sql, where) {
    let values = [];
    let str = '';
    for (let key in where) {
      if (where.hasOwnProperty(key)) {
        values.push(key, where[key]);
        if (str === '') {
          str += 'WHERE ??=?';
        } else {
          str += ' AND ??=?';
        }
      }
    }
    return {
      sql: sql.replace('{WHERE}', str),
      values: values
    };
  }
};
