/**
 * Created by xiaobxia on 2017/6/23.
 */
const result = require('../../util/result');
const loginService = require('../../service/loginService');
module.exports = {
    method: 'post',
    api: 'sys/login',
    response: function (req, res) {
        let postBody = req.body;
        //let session = req.session;
        loginService(postBody, function (error, user) {
            if(error){
                res.json(result.error(error.message, error.code))
            } else {
                res.json({
                    success: true,
                    result: {
                        userCode: user['USER_CODE'],
                        userName: user['USER_NAME']
                    }
                })
            }
        })
    }
}