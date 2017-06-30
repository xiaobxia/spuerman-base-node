/**
 * Created by xiaobxia on 2017/6/23.
 */
const BaseResult = require('../../model/result/baseResult');
const LoginModel = require('../../model/result/loginModel');
const sessionConst = require('../../model/const/session');
const Session = require('../../model/result/session');
module.exports = {
    method: 'get',
    api: 'sys/isLogin',
    response: function (req, res) {
        let session = new Session(req.session);
        let result = new BaseResult();
        let loginModel = new LoginModel();
        let user = session.getAttribute(sessionConst.SESSION_LOGIN_USER);
        if(user){
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
}