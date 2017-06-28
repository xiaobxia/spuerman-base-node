/**
 * Created by xiaobxia on 2017/6/27.
 */
const userModel = require('../model/sys/user');
const moment = require('moment');
module.exports = {
    method: 'post',
    api: 'sys/test',
    response: function (req, res) {
        console.log('in')
        console.log(moment().format('YYYY-M-D HH:mm:ss'))
        console.log(typeof moment().format('YYYY-M-D HH:mm:ss'))
        let postBody = req.body;
        userModel.updateUser(postBody.userCode, {
            LOGIN_FAIL: 0,
            IS_LOCKED: 'N',
            UNLOCK_DATE: null
        }, function (error, results, fields) {
            console.log(error)
            console.log(results)
            res.json(results)
        })
        // userModel.updateUser(postBody.userCode,{
        //     LOGIN_FAIL: 1,
        //     UNLOCK_DATE: moment().format('YYYY-M-D HH:mm:ss')
        // },function (error, results, fields) {
        //     console.log(error)
        //     console.log(results)
        //     console.log(fields)
        //     res.json({ret_code: 0, ret_msg: '登录成功'});
        // })
        //
        // let sess = req.session;
        // let loginUser = sess.loginUser;
        // let isLogined = !!loginUser;
        // res.json({
        //     "success": true,
        //     "result": {
        //         "userCode": "admin",
        //         "userName": loginUser,
        //         "login": isLogined
        //     }
        // })
    }
}