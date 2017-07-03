/**
 * Created by xiaobxia on 2017/6/23.
 */
const BaseResult = require('../../model/result/baseResult');
const LoginModel = require('../../model/result/loginModel');
const loginService = require('../../service/loginService');
const sessionConst = require('../../model/const/session');
const sessionService = require('../../service/sessionService');
const logger = require('../../common/logger')
module.exports = [
    {
        method: 'post',
        api: 'sys/login',
        response: function (req, res) {
            let postBody = req.body;
            let session = req.session;
            //let session = new Session();
            loginService(postBody, function (error, user) {
                let result = new BaseResult();
                if (error) {
                    result.setErrorCode(error.code);
                    result.setErrorMessage(error.message);
                    res.json(result)
                } else {
                    let loginModel = new LoginModel();
                    sessionService(user, session.id, req.headers['user-agent'], function (error, userSession) {
                        if (error) {
                            result.setErrorCode(error.code);
                            result.setErrorMessage(error.message);
                        } else {
                            //设置session
                            //TODO 使用redis管理session
                            // session.setAttribute(sessionConst.SESSION_LOGIN_USER, user);
                            // session.setAttribute(sessionConst.SESSION_LOGIN_USER_SESSION, userSession)
                            req.session[sessionConst.SESSION_LOGIN_USER] =  user;
                            //返回模型
                            loginModel.setLogin(true);
                            loginModel.setUserCode(user['USER_CODE']);
                            loginModel.setUserName(user['USER_NAME']);
                            loginModel.setToken(session.id)
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
        }
    },
    {
        method: 'get',
        api: 'sys/logout',
        response: function (req, res) {
            let result = new BaseResult();
            req.session[sessionConst.SESSION_LOGIN_USER] = null;
            res.json(result)
        }
    }
]