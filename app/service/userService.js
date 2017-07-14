/**
 * Created by xiaobxia on 2017/7/4.
 */
const co = require('co');
const md5 = require('md5');
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

  changePwd(user, oldPassword, newPassword) {
    let encryptPwd = md5(user['USER_CODE'] + '#' + oldPassword);
    //验证密码
    if (encryptPwd !== user['PWD']) {
      this.throwBaseError('用户原密码错误', 'USER_ORIGIN_PWD_ERROR');
    }
    //密码不能相同
    if (oldPassword === newPassword) {
      this.throwBaseError('密码相同', 'USER_CHANGE_PWD_ORIGIN_AND_NEW_ARE_SAME_ERROR');
    }
    //密码长度
    if (newPassword.length < 5 || newPassword.length > 20) {
      this.throwBaseError('密码长度不合规', 'USER_PWD_LENGTH_ERROR');
    }
    let self = this;
    let fn = co.wrap(function*(user, oldPassword, newPassword) {
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      yield userORM.updateUserByUserId(user['USER_ID'], {
        PWD: md5(`${user['USER_CODE']}#${newPassword}`)
      });
      self.loggerWarn(`${user['USER_CODE']}修改了密码 ** 新密码: ${newPassword}`);
    });
    return fn(user, oldPassword, newPassword);
  }
};
