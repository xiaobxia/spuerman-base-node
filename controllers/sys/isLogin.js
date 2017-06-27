/**
 * Created by xiaobxia on 2017/6/23.
 */
const dbQuery = require('../../datebase')
module.exports = {
    method: 'get',
    api: 'sys/isLogin',
    response: function (req, res) {
        let session = req.session;
        let loginUser = session.loginUser;
        let isLogined = !!loginUser;
        dbQuery();
        res.json({
            "success": true,
            "result": {
                "userCode": "admin",
                "userName": loginUser,
                "login": isLogined
            }
        })
    }
}