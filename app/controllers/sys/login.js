/**
 * Created by xiaobxia on 2017/6/23.
 */
const BaseResult = require('../../model/result/baseResult');
const LoginModel = require('../../model/result/loginModel');
const Session = require('../../model/result/session');
const loginService = require('../../service/loginService');
const sessionConst = require('../../model/const/session');
const sessionService = require('../../service/sessionService');
module.exports = [
    {
        method: 'post',
        api: 'sys/login',
        response: function (req, res) {
            let postBody = req.body;
            let session = new Session();
            loginService(postBody, function (error, user) {
                let result = new BaseResult();
                if (error) {
                    result.setErrorCode(error.code);
                    result.setErrorMessage(error.message);
                    res.json(result)
                } else {
                    let loginModel = new LoginModel();
                    sessionService(user, session.getId(), req.headers['user-agent'], function (error, userSession) {
                        if (error) {
                            result.setErrorCode(error.code);
                            result.setErrorMessage(error.message);
                        } else {
                            //设置session
                            session.setAttribute(sessionConst.SESSION_LOGIN_USER, user);
                            session.setAttribute(sessionConst.SESSION_LOGIN_USER_SESSION, userSession)
                            req.session = session;
                            //返回模型
                            loginModel.setLogin(true);
                            loginModel.setUserCode(user['USER_CODE']);
                            loginModel.setUserName(user['USER_NAME']);
                            loginModel.setToken(session.getId())
                            //setToken
                            result.setResult(loginModel)
                        }
                        res.json(result)
                    })
                }
            })
        }
    },
    {
        method: 'get',
        api: 'sys/isLogin',
        response: function (req, res) {
            let session = new Session(req.session);
            let result = new BaseResult();
            let loginModel = new LoginModel();
            let user = session.getAttribute(sessionConst.SESSION_LOGIN_USER);
            if (user) {
                loginModel.setLogin(true);
                loginModel.setUserCode(user['USER_CODE']);
                loginModel.setUserName(user['USER_NAME']);
                loginModel.setToken(session.getId())
            } else {
                loginModel.setLogin(false);
            }
            result.setResult(loginModel);
            res.json(result);
        }
    },
    {
        method: 'get',
        api: 'sys/logout',
        response: function (req, res) {
            let result = new BaseResult();
            req.session = null;
            res.json(result)
        }
    }
]