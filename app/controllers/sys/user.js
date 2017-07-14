/**
 * Created by xiaobxia on 2017/7/4.
 */
// const BaseResult = require('../../model/result/baseResult');
// const sessionConst = require('../../model/const/session');
// const privilegeService = require('../../service/privilegeService');
// const paging = require('../../common/paging');
const co = require('co');
const BaseController = require('../base');
const UserService = require('../../service/userService');
module.exports = class UserController extends BaseController {
  /**
   * method get
   * api sys/user/:id
   * @param req
   * @param res
   * @param next
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
   * method post
   * api sys/user/checkUserMenuPriv
   * @param req
   * @param res
   * @param next
   */
  checkUserMenuPriv(req, res, next) {
    let rules = {
      path: {type: 'string', required: true}
    };
    this.validate(rules, req.body.path);
    let user = this.getSessionUser(req.session);
    let result = this.result();
    let userService = new UserService();
  }
};

exports.checkUserMenuPriv = function (req, res, next) {
  //TODO 检验参数
  let path = req.body.path;
  let user = req.session[sessionConst.SESSION_LOGIN_USER];
  let result = new BaseResult();
  privilegeService.checkUserMenuPriv(user['USER_ID'], path, function (error, passport) {
    if (error) {
      result.setErrorCode(error.code);
      result.setErrorMessage(error.message);
    } else {
      result.setResult(passport);
    }
    res.json(result);
  })
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
// exports.getUsers = function (req, res, next) {
//   let query = req.query;
//   let pagingModel = paging(query.pageIndex, query.pageSize);
//   let result = new BaseResult();
//   userService.getUsers(pagingModel.start, pagingModel.offset, function (error, users) {
//     if (error) {
//       result.setErrorCode(error.code);
//       result.setErrorMessage(error.message);
//     } else {
//       result.setResult(users)
//     }
//     res.json(result);
//   })
// };
