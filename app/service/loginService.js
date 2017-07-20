/**
 * Created by xiaobxia on 2017/6/27.
 */
const co = require('co');
const moment = require('moment');
const md5 = require('md5');
const BaseService = require('./base');
const UserORM = require('../model/orm/sys/user');

module.exports = class LoginService extends BaseService {
  login(userCode, password) {
    let self = this;
    let fn = co.wrap(function*(userCode, password) {
      let dbResult = [];
      let connection = self.getConnection();
      let userORM = new UserORM(connection);
      //得到用户
      dbResult = yield userORM.getUserByUserCode(userCode);
      self.checkDBResult(dbResult, '用户名或密码错误', 'USER_NAME_OR_PWD_ERROR');
      let user = dbResult[0];
      let isLockBefore = user['IS_LOCKED'] === 'Y';
      if (isLockBefore) {
        //判断解锁
        if (moment().isAfter(user['UNLOCK_DATE'])) {
          yield userORM.updateUserByUserId(user['USER_ID'], {
            LOGIN_FAIL: 0,
            IS_LOCKED: 'N',
            UNLOCK_DATE: null
          });
          //得到用户新状态
          dbResult = yield userORM.getUserByUserId(user['USER_ID']);
          user = dbResult[0];
        } else {
          self.loggerWarn('此用户被锁定');
          self.throwBaseError('当前用户被锁定', 'USER IS LOCKED');
        }
      }
      //判断密码
      let encryptPwd = md5(userCode + '#' + password);
      if (user['PWD'] === encryptPwd) {
        //清空尝试
        if (!isLockBefore && user['LOGIN_FAIL'] !==0) {
          yield userORM.updateUserByUserId(user['USER_ID'], {
            LOGIN_FAIL: 0,
            IS_LOCKED: 'N',
            UNLOCK_DATE: null
          });
        }
        return user;
      } else {
        //密码不匹配
        let updateData = null;
        if (user['LOGIN_FAIL'] > 6) {
          //失败大于6次
          self.loggerWarn('此用户登录失败次数：' + user['LOGIN_FAIL']);
          updateData = {
            IS_LOCKED: 'Y',
            UNLOCK_DATE: moment().add(3, 'minutes').format('YYYY-M-D HH:mm:ss')
          };
        } else {
          updateData = {
            LOGIN_FAIL: 1 + user['LOGIN_FAIL']
          };
        }
        yield userORM.updateUserByUserId(user['USER_ID'], updateData);
        self.throwBaseError('用户名或密码错误', 'USER_NAME_OR_PWD_ERROR');
      }
    });
    return fn(userCode, password);
  }
};
