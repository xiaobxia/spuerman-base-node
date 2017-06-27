/**
 * Created by xiaobxia on 2017/6/23.
 */
module.exports = {
    method: 'get',
    api: 'sys/logout',
    response: function (req, res) {
        req.session = null;
        res.json({
            ret_msg: '退出成功'
        })
        /*
        req.session.destroy(function(err) {
            if(err){
                res.json({ret_code: 2, ret_msg: '退出登录失败'});
                return;
            }
            // req.session.loginUser = null;
            res.clearCookie('crm-web');
            //res.redirect('/');
        });
        */
/*
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
        */
    }
}