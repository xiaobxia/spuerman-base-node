/**
 * Created by xiaobxia on 2017/7/4.
 */
const co = require('co');
const BaseController = require('../base');
const UserService = require('../../service/userService');
const PrivilegeService = require('../../service/privilegeService')
module.exports = class UserController extends BaseController {
  /**
   * method get
   * api sys/user/:id
   * @param req
   * @param res
   * @param next
   * benchmark 500/700
   */
  getUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let requestData = {
        id: parseInt(req.params.id)
      };
      let illegalMsg = self.validate(
        {id: {required: 'true', type: 'number'}},
        requestData
      );
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let userService = new UserService(connection);
          let user = yield userService.getUserById(requestData.id);
          connection.release();
          result.setResult(user);
          res.json(result);
        } catch (error) {
          if (connection) {
            connection.release();
          }
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        }
      } else {
        let msg = illegalMsg[0];
        result.setErrorCode(msg.code);
        result.setErrorMessage(msg.field + ' ' + msg.message);
        res.json(result);
      }
    });
  }

  /**
   * method get
   * api sys/user/usersCount
   * @param req
   * @param res
   * @param next
   * benchmark 500/650
   */
  getUserCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let count = yield userService.getUserCount();
        connection.release();
        result.setResult(count);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        result.setErrorCode(error.code);
        result.setErrorMessage(error.message);
        res.json(result);
      }
    });
  }

  /**
   * method get
   * api /sys/users
   * @param req
   * @param res
   * @param next
   * benchmark 500/820
   */
  getUsers() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let users = yield userService.getUsers(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(users);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        result.setErrorCode(error.code);
        result.setErrorMessage(error.message);
        res.json(result);
      }
    });
  }

  /**
   * method post
   * api sys/user/checkUserMenuPriv
   * @param req
   * @param res
   * @param next
   */
  checkUserMenuPriv() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let rules = {
        path: {type: 'string', required: true}
      };
      let illegalMsg = self.validate(rules, req.body);
      if (illegalMsg === undefined) {
        let connection = null;
        let result = self.result();
        let user = self.getSessionUser(req.session);
        try {
          connection = yield self.getPoolConnection();
          let privilegeService = new PrivilegeService(connection);
          let ifPass = yield privilegeService.checkUserMenuPriv(user['USER_ID'], req.body.path);
          connection.release();
          result.setResult(ifPass);
          res.json(result);
        } catch (error) {
          if (connection) {
            connection.release();
          }
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        }
      } else {
        let msg = illegalMsg[0];
        next(self.error(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }
};
// /**
//  * method post
//  * api sys/user/changePwd
//  * @param req
//  * @param res
//  * @param next
//  */
//
// exports.changePwd = function (req, res, next) {
//   let postData = req.body,
//     oldPassword = postData.oldPwd,
//     newPassword = postData.newPwd;
//   let user = req.session[sessionConst.SESSION_LOGIN_USER];
//   let result = new BaseResult();
//   userService.changePwd(user, oldPassword, newPassword, function (error, msg) {
//     if (error) {
//       result.setErrorCode(error.code);
//       result.setErrorMessage(error.message);
//     }
//     res.json(result);
//   })
// };
//
