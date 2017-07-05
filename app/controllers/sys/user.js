/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseResult = require('../../model/result/baseResult');
const sessionConst = require('../../model/const/session');
const privilegeService = require('../../service/privilegeService');
const userService = require('../../service/userService');
const paging = require('../../../util/paging');
const validator = require('validator');
/**
 * method post
 * api sys/user/checkUserMenuPriv
 * @param req
 * @param res
 * @param next
 */
exports.checkUserMenuPriv = function (req,res,next) {
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
/**
 * method post
 * api sys/user/changePwd
 * @param req
 * @param res
 * @param next
 */

exports.changePwd = function (req,res,next) {
    let postData = req.body,
        oldPassword = postData.oldPwd,
        newPassword = postData.newPwd;
    let user = req.session[sessionConst.SESSION_LOGIN_USER];
    let result = new BaseResult();
    userService.changePwd(user,oldPassword,newPassword,function (error,msg) {
        if (error) {
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
        }
        res.json(result);
    })
};
/**
 * method get
 * api sys/user/usersCount
 * @param req
 * @param res
 * @param next
 */
exports.usersCount = function (req,res,next) {
    let result = new BaseResult();
    userService.getUserCount(function (error, count) {
        if (error) {
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
        } else {
            result.setResult(count)
        }
        res.json(result);
    })
};
/**
 * method get
 * api sys/user/:id
 * @param req
 * @param res
 * @param next
 */
exports.showUser = function (req,res,next) {
    let userId = req.params.id;
    let result = new BaseResult();
    userService.getUserById(userId, function (error, user) {
        if (error) {
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
        } else {
            result.setResult(user)
        }
        res.json(result);
    })
};

exports.getUsers = function (req,res,next) {
    let query = req.query;
    let pagingModel = paging(query.pageIndex,query.pageSize);
    let result = new BaseResult();
    userService.getUsers(pagingModel.start,pagingModel.offset,function (error,users) {
        if (error) {
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
        } else {
            result.setResult(users)
        }
        res.json(result);
    })
};