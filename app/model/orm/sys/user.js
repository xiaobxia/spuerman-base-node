/**
 * Created by xiaobxia on 2017/6/26.
 */
const BaseORM = require('../base');
module.exports = class UserORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  getUserCount() {
    return this.query('SELECT COUNT(*) AS count FROM sys_user WHERE STATE="A"');
  }

  getUser(where) {
    return this.query({
      sql: 'SELECT * FROM sys_user WHERE STATE="A" AND ?',
      values: where
    });
  }

  getUserByUserCode(userCode) {
    return this.getUser({
      'USER_CODE': userCode
    });
  }

  getUserByUserId(userId){
    return this.getUser({
      'USER_ID': userId
    });
  }

  updateUser(data, where) {
    return this.query({
      sql: 'UPDATE sys_user SET ? WHERE ?',
      values: [data, where]
    });
  }

  getUserRoleByUserId(userId) {
    return this.query({
      sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE="A"',
      values: userId
    });
  }
  getUsersByIds(ids) {
    return this.query({
      sql: 'SELECT * FROM sys_user WHERE USER_ID IN (?)',
      values: ids
    });
  }

  getUsers(start, offset) {
    this.query({
      sql: 'SELECT USER_ID FROM sys_user WHERE STATE="A" LIMIT ?,?',
      values: [start, offset]
    }).then((results)=>{
      if (!results.length) {
        //为空的话直接返回空数组
        return results;
      } else {
        let ids = [];
        for (let k = 0; k < results.length; k++) {
          ids.push(results[k]['USER_ID']);
        }
        return this.getUsersByIds(ids);
      }
    });
  }
};
// module.exports = {
//   //callback(error, results, fields);
//   getUserByUserCode: function (connection, userCode, callback) {
//     let query = connection.query(
//       {
//         sql: 'SELECT * FROM sys_user WHERE STATE="A" AND USER_CODE= ?',
//         values: userCode
//       },
//       callback
//     );
//     logger.trace('sql: ' + query.sql);
//   },
//   updateUser: function (connection, user, data, callback) {
//     let query = connection.query(
//       {
//         sql: 'UPDATE sys_user SET ? WHERE ?',
//         values: [data, user]
//       },
//       callback
//     );
//     logger.trace('sql: ' + query.sql);
//   },
//   getUserRole: function (connection, userId, callback) {
//     let query = connection.query(
//       {
//         sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE="A"',
//         values: userId
//       },
//       callback
//     );
//     logger.trace('sql: ' + query.sql);
//   },
//   getUser: function (connection, data, callback) {
//     let query = connection.query(
//       {
//         sql: 'SELECT * FROM sys_user WHERE STATE="A" AND ?',
//         values: data
//       },
//       callback
//     );
//     logger.trace('sql: ' + query.sql);
//   },
//   getUserCount: function (connection, callback) {
//     let query = connection.query('SELECT COUNT(*) AS count FROM sys_user WHERE STATE="A"', callback);
//     logger.trace('sql: ' + query.sql);
//   },
//   //封装分页,sequelize是否有分页优化
//   getUsers: function (connection, start, offset, callback) {
//     let query1 = connection.query(
//       {
//         sql: 'SELECT USER_ID FROM sys_user WHERE STATE="A" LIMIT ?,?',
//         values: [start, offset]
//       },
//       function (error, results, fields) {
//         if (error) {
//           callback(error)
//         } else {
//           if (!results.length) {
//             callback(null, results);
//           } else {
//             let ids = [];
//             for (let k = 0; k < results.length; k++) {
//               ids.push(results[k]['USER_ID']);
//             }
//             let query = connection.query(
//               {
//                 sql: 'SELECT * FROM sys_user WHERE USER_ID IN (?)',
//                 values: results
//               },
//               callback
//             );
//             logger.trace('sql: ' + query.sql);
//           }
//         }
//       }
//     );
//     logger.trace('sql: ' + query1.sql);
//   }
// };
