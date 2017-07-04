/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseResult = require('../../model/result/baseResult');
const sessionConst = require('../../model/const/session');
const privilegeService = require('../../service/privilegeService');
module.exports = [
    {
        method: 'post',
        api: 'sys/user/checkUserMenuPriv',
        response: function (req, res) {
            //TODO 检验参数
            let path = req.body.path;
            let user = req.session[sessionConst.SESSION_LOGIN_USER];
            let result = new BaseResult();
            privilegeService.checkUserMenuPriv(user['USER_ID'],path, function (error, passport) {
                if (error) {
                    result.setErrorCode(error.code);
                    result.setErrorMessage(error.message);
                } else {
                    result.setResult(passport);
                }
                res.json(result);
            })
        }
    }
];