/**
 * Created by xiaobxia on 2017/6/23.
 */
const co = require('co');
const BaseController = require('../base');
const LoginService = require('../../service/loginService');
const SessionService = require('../../service/sessionService');
const LogAuditService = require('../../service/logAuditService');
const LoginModel = require('../../model/result/loginModel');
module.exports = class LoginController extends BaseController {
  /**
   * method post
   * api sys/login
   * @param req
   * @param res
   * @param next
   * benchmark 100/(1200)
   */
  login() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let postBody = req.body;
      let session = req.session;
      let data = {
        userCode: postBody.userCode,
        pwd: postBody.pwd
      };
      let rules = {
        userCode: {type: 'string', required: true},
        pwd: {type: 'string', required: true}
      };
      let illegalMsg = self.validate(rules, data);
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          //开始事务
          yield self.beginTransaction(connection);
          let loginService = new LoginService(connection);
          let user = yield loginService.login(postBody.userCode, postBody.pwd);
          let sessionService = new SessionService(connection);
          yield sessionService.saveSession({
            userId: user['USER_ID'],
            userState: user['STATE'],
            ua: req.headers['user-agent'],
            token: session.id
          });
          let logAudit = new LogAuditService(connection);
          yield logAudit.addLog('LOGOUT', user['USER_ID'], 'Login Success.');
          //提交修改
          yield self.commit(connection);
          connection.release();
          let loginModel = new LoginModel();
          self.setSessionUser(req.session, user);
          loginModel.setLogin(true);
          loginModel.setUserCode(user['USER_CODE']);
          loginModel.setUserName(user['USER_NAME']);
          loginModel.setToken(session.id);
          result.setResult(loginModel);
          res.json(result);
        } catch (error) {
          if (connection) {
            //回滚
            connection.rollback();
            connection.release();
          }
          next(error);
        }
      } else {
        let msg = illegalMsg[0];
        next(self.parameterError(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }

  /**
   * method get
   * api sys/isLogin
   * @param req
   * @param res
   * @param next
   * benchmark 500/(460-520)
   */
  isLogin() {
    let self = this;
    //没有异步
    return function(req, res, next) {
      let result = self.result();
      let loginModel = new LoginModel();
      let user = self.getSessionUser(req.session);
      if (user) {
        loginModel.setLogin(true);
        loginModel.setUserCode(user['USER_CODE']);
        loginModel.setUserName(user['USER_NAME']);
        loginModel.setToken(req.session.id);
      } else {
        loginModel.setLogin(false);
      }
      result.setResult(loginModel);
      res.json(result);
    };
  }

  /**
   * method get
   * api sys/logout
   * @param req
   * @param res
   * @param next
   * benchmark 500/(460-500)
   */
  logout() {
    let self = this;
    return co.wrap(function* (req, res, next) {
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let logAudit = new LogAuditService(connection);
        let user = self.getSessionUser(req.session);
        yield logAudit.addLog('LOGOUT', user['USER_ID'], 'Logout successfully.');
        let result = self.result();
        req.session.destroy();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }
};
