/**
 * Created by xiaobxia on 2017/7/4.
 */
// const BaseResult = require('../../model/result/baseResult');
// const sessionConst = require('../../model/const/session');
// const privilegeService = require('../../service/privilegeService');
// const paging = require('../../common/paging');
const BaseController = require('../base');
const UserService = require('../../service/userService');
module.exports = class UserController extends BaseController {
  constructor() {
    super();
  }
  /**
   * method post
   * api sys/user/checkUserMenuPriv
   * @param req
   * @param res
   * @param next
   */
  // checkUserMenuPriv(req, res, next) {
  //   let rules = {
  //     path: {type: 'string', required: true}
  //   };
  //   this.validate(rules, req.body.path);
  //   let result = this.result();
  // }
  getUser(req, res, next) {
    let requestData = {
      id: parseInt(req.params.id)
    };
    let illegalMsg = this.validate(
      {id: {required: 'true', type: 'number'}},
      requestData
    );
    let result = this.result();
    if (illegalMsg === undefined) {
      let userService = new UserService();
      userService.getUserById(requestData.id).then((user)=>{
        result.setResult(user);
        res.json(result);
      }).catch(function (error) {
        result.setErrorCode(error.code);
        result.setErrorMessage(error.message);
        res.json(result);
      });
    } else {
      //第一个错误就好
      let msg = illegalMsg[0];
      result.setErrorCode(msg.code);
      result.setErrorMessage(msg.field + '' +msg.message);
      res.json(result);
    }
  }
};

// exports.checkUserMenuPriv = function (req, res, next) {
//   //TODO 检验参数
//   let path = req.body.path;
//   let user = req.session[sessionConst.SESSION_LOGIN_USER];
//   let result = new BaseResult();
//   privilegeService.checkUserMenuPriv(user['USER_ID'], path, function (error, passport) {
//     if (error) {
//       result.setErrorCode(error.code);
//       result.setErrorMessage(error.message);
//     } else {
//       result.setResult(passport);
//     }
//     res.json(result);
//   })
// };
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
// /**
//  * method get
//  * api sys/user/usersCount
//  * @param req
//  * @param res
//  * @param next
//  */
// exports.usersCount = function (req, res, next) {
//   let result = new BaseResult();
//   userService.getUserCount(function (error, count) {
//     if (error) {
//       result.setErrorCode(error.code);
//       result.setErrorMessage(error.message);
//     } else {
//       result.setResult(count)
//     }
//     res.json(result);
//   })
// };
// /**
//  * method get
//  * api sys/user/:id
//  * @param req
//  * @param res
//  * @param next
//  */
// exports.showUser = function (req, res, next) {
//   let userId = req.params.id;
//   let result = new BaseResult();
//   userService.getUserById(userId, function (error, user) {
//     if (error) {
//       result.setErrorCode(error.code);
//       result.setErrorMessage(error.message);
//     } else {
//       result.setResult(user)
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
