/**
 * Created by xiaobxia on 2017/6/23.
 */
const  dbQuery = require('../../datebase')
const md5 = require('md5');
module.exports = {
    method: 'get',
    api: 'sys/login',
    response: function (req, res) {
        console.log(req.query)
        console.log(req.method)
        console.log(req.session);
        dbQuery('SELECT * FROM sys_role', function (connection) {
            return function (error, results, fields) {
                console.log(error);
                console.log(results);
                console.log(fields);
            }
        });
        console.log(md5('admin#admin'))
        req.session.loginUser = 'xiaobxia';
        res.json({ret_code: 0, ret_msg: '登录成功'});
    }
}