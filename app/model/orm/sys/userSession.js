/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseORM = require('../base');
module.exports = class UserSessionORM extends BaseORM {
  constructor(connection) {
    super(connection);
  }

  insertSession(sessionData) {
    return this.query({
      sql: 'INSERT INTO sys_user_session SET ?',
      values: sessionData
    });
  }
};
// module.exports = {
//   //callback(error, results, fields)
//   insertSession: function (connection, data, callback) {
//     let query = connection.query(
//       {
//         sql: 'INSERT INTO sys_user_session SET ?',
//         values: data
//       },
//       callback
//     );
//     logger.trace('sql: ' + query.sql);
//   }
// };
