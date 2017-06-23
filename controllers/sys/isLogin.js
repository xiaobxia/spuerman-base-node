/**
 * Created by xiaobxia on 2017/6/23.
 */
module.exports = {
    method: 'get',
    api: 'sys/isLogin',
    response: function (req, res) {
        console.log(req.query)
        console.log(req.method)
        console.log(req.session);
        var sess = req.session;
        var loginUser = sess.loginUser;
        var isLogined = !!loginUser;
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