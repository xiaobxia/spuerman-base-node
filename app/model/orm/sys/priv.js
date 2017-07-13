/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseORM = require('../base');
module.exports = class PrivORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getPrivsSimpleInfoByIds(ids) {
    return this.query({
      sql: 'SELECT ?? FROM sys_priv WHERE TYPE!="2" AND STATE="A" AND PRIV_ID IN (?)',
      values: [['PRIV_ID', 'PARENT_PRIV_ID', 'PRIV_NAME', 'TYPE', 'URL', 'PATH'], ids]
    });
  }

  checkPathInPrivs(privIds, path) {
    return this.query({
      sql: 'SELECT 1 FROM sys_priv WHERE STATE="A" AND PATH=? AND PRIV_ID IN (?)',
      values: [path, privIds]
    });
  }
};
// exports.getPrivsInfo = function (connection, privs, callback) {
//   let query = connection.query(
//     {
//       sql: 'SELECT ?? FROM sys_priv WHERE TYPE!="2" AND STATE="A" AND PRIV_ID IN (?)',
//       values: [['PRIV_ID', 'PARENT_PRIV_ID', 'PRIV_NAME', 'TYPE', 'URL', 'PATH'], privs]
//     },
//     callback
//   );
//   logger.trace('sql: ' + query.sql);
// };
// exports.checkPath = function (connection, priv, path, callback) {
//   let query = connection.query(
//     {
//       sql: 'SELECT 1 FROM sys_priv WHERE STATE="A" AND PATH=? AND PRIV_ID IN (?)',
//       values: [path, priv]
//     },
//     callback
//   );
//   logger.trace('sql: ' + query.sql);
// };
