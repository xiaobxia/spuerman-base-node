/**
 * Created by xiaobxia on 2017/7/12.
 */
const pool = require('../common/mysqlPool');
module.exports = class BaseService {
  constructor(){
  }
  getPoolConnection(callback){
    pool.getConnection(callback);
  }
  saveConnection(){

  }
};
