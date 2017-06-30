/**
 * Created by xiaobxia on 2017/6/30.
 */
const BaseResult = require('../../model/result/baseResult');
const Session = require('../../model/result/session');
const sessionConst = require('../../model/const/session');
const privilegeService = require('../../service/privilegeService');

module.exports = [
    {
        method: 'get',
        api: 'sys/priv/menu',
        response: function (req, res) {
            let session = new Session(req.session);
            let result = new BaseResult();
            let user = session.getAttribute(sessionConst.SESSION_LOGIN_USER);
            privilegeService.getUserRole(user['USER_ID'],function (error, roleId) {
            })
        }
    }
]