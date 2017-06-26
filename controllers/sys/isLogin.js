/**
 * Created by xiaobxia on 2017/6/23.
 */
const dbQuery = require('../../datebase')
module.exports = {
    method: 'get',
    api: 'sys/isLogin',
    response: function (req, res) {
        console.log(req.query)
        console.log(req.method)
        console.log(req.session);
        let sess = req.session;
        let loginUser = sess.loginUser;
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