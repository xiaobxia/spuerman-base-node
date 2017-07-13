/**
 * Created by xiaobxia on 2017/7/12.
 */
const pool = require('../common/mysqlPool');
module.exports = class BaseService {
  constructor() {
  }

  getPoolConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }

  saveConnection() {

  }
};
