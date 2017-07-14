/**
 * Created by xiaobxia on 2017/7/4.
 */
const co = require('co');
const BaseService = require('./base');
const UserORM = require('../model/orm/sys/user');

module.exports = class UserService extends BaseService {
  getUserById(userId) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      let user = yield userORM.getUserByUserId(id);
      return user;
    });
    return fn(userId);
  }

  getUserCount() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      let count = yield userORM.getUserCount();
      return count;
    });
    return fn();
  }

  getUsers(start, offset) {
    let self = this;
    let fn = co.wrap(function*(start, offset) {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      let users = yield userORM.getUsers(start, offset);
      return users;
    });
    return fn(start, offset);
  }
};

//
// exports.changePwd = function (user, oldPassword, newPassword, controllerCallback) {
//   //验证密码
//   let encryptPwd = md5(`${user['USER_CODE']}#${oldPassword}`);
//   if (encryptPwd !== user['PWD']) {
//     controllerCallback(errorModel.baseError('用户原密码错误', 'USER_ORIGIN_PWD_ERROR'))
//     return;
//   }
//   //密码不能相同
//   if (oldPassword === newPassword) {
//     controllerCallback(errorModel.baseError('密码相同', 'USER_CHANGE_PWD_ORIGIN_AND_NEW_ARE_SAME_ERROR'))
//     return;
//   }
//   //密码长度
//   if (newPassword.length < 5 || newPassword.length > 20) {
//     controllerCallback(errorModel.baseError('密码长度不合规', 'USER_PWD_LENGTH_ERROR'))
//     return;
//   }
//   pool.getConnection(function (error, connection) {
//     if (error) {
//       logger.error(error);
//       controllerCallback(errorModel.dbError(error.code));
//     } else {
//       userORM.updateUser(connection, {USER_ID: user['USER_ID']},
//         {PWD: md5(`${user['USER_CODE']}#${newPassword}`)},
//         function (error, results, fields) {
//           connection.release();
//           if (error) {
//             logger.error(error);
//             controllerCallback(errorModel.dbError(error.code));
//           } else {
//             logger.info(`${user['USER_CODE']}修改了密码 ** 新密码: ${newPassword}`)
//             controllerCallback(null, true)
//           }
//         }
//       )
//     }
//   })
// };
//
//
