/**
 * Created by xiaobxia on 2017/6/23.
 */
module.exports = {
    method: 'get',
    api: 'sys/login',
    response: function (req, res) {
        console.log(req.query)
        console.log(req.method)
        console.log(req.session);
        req.session.loginUser = 'xiaobxia';
        res.json({ret_code: 0, ret_msg: '登录成功'});
    }
}