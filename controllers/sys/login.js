/**
 * Created by xiaobxia on 2017/6/23.
 */

const result = require('../../util/result');

const md5 = require('md5');

module.exports = {
    method: 'post',
    api: 'sys/login',
    response: function (req, res) {
        let postBody = req.body;
        //生成加密码
        let encryptPwd = md5(`${postBody.userCode}#${postBody.pwd}`);
    }
}