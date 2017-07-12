/**
 * Created by xiaobxia on 2017/6/23.
 */
const BaseResult = require('../../model/result/baseResult');
const LoginModel = require('../../model/result/loginModel');
const loginService = require('../../service/loginService');
const sessionConst = require('../../model/const/session');
const sessionService = require('../../service/sessionService');

/**
 * method post
 * api sys/login
 * @param req
 * @param res
 * @param next
 */
exports.login = function (req, res, next) {
  let postBody = req.body;
  let session = req.session;
  //let session = new Session();
  loginService(postBody, session.id, req.headers['user-agent'], function (error, user) {
    let result = new BaseResult();
    if (error) {
      result.setErrorCode(error.code);
      result.setErrorMessage(error.message);
    } else {
      let loginModel = new LoginModel();
      req.session[sessionConst.SESSION_LOGIN_USER] = user;
      loginModel.setLogin(true);
      loginModel.setUserCode(user['USER_CODE']);
      loginModel.setUserName(user['USER_NAME']);
      loginModel.setToken(session.id);
      result.setResult(loginModel)
    }
    res.json(result)
  })
};
/**
 * method get
 * api sys/isLogin
 * @param req
 * @param res
 * @param next
 */
exports.isLogin = function (req, res, next) {
  let session = req.session;
  let result = new BaseResult();
  let loginModel = new LoginModel();
  let user = session[sessionConst.SESSION_LOGIN_USER];
  if (user) {
    loginModel.setLogin(true);
    loginModel.setUserCode(user['USER_CODE']);
    loginModel.setUserName(user['USER_NAME']);
    loginModel.setToken(session.id)
  } else {
    loginModel.setLogin(false);
  }
  result.setResult(loginModel);
  res.json(result);
};
/**
 * method get
 * api sys/logout
 * @param req
 * @param res
 * @param next
 */
exports.logout = function (req, res, next) {
  let result = new BaseResult();
  req.session.destroy();
  //res.clearCookie(config.auth_cookie_name, { path: '/' });
  //res.redirect('/');
  //req.session[sessionConst.SESSION_LOGIN_USER] = null;
  res.json(result)
};
