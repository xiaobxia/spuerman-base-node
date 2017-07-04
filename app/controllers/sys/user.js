/**
 * Created by xiaobxia on 2017/7/4.
 */
const BaseResult = require('../../model/result/baseResult');
const sessionConst = require('../../model/const/session');
const privilegeService = require('../../service/privilegeService');
const userService = require('../../service/userService');
module.exports = [
    {
        method: 'post',
        api: 'sys/user/checkUserMenuPriv',
        response: function (req, res) {
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
        }
    },
    {
        method: 'post',
        api: 'sys/user/changePwd',
        response: function (req, res) {
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
        }
    },
    {
        method: 'get',
        api: 'sys/user/:id',
        response: function (req, res) {
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
        }
    }

];