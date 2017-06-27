/**
 * Created by xiaobxia on 2017/6/27.
 */
const colors = require('colors');
const moment = require('moment');
const result = require('../../util/result');
const userModel = require('../../model/sys/user');

module.exports = function (res, postBody) {
    let msg = {
        success: false,
        response: null
    };
    userModel.getUser(res, postBody.userCode,function (results, fields) {
        //用户不存在
        if(!results){
            console.log('请求用户名不存在'.yellow)
            msg.success = false;
            msg.response = result.error('用户名或密码错误','USER_NAME_OR_PWD_ERROR');
            return false;
        }
        let user = results[0];
        //判断锁定
        if(user['IS_LOCKED']==='Y'){
            console.log('此用户被锁定'.yellow)
            //判断是否到达解锁时间
            if (moment().isAfter(user['UNLOCK_DATE'])){
                userModel.updateUser(res, postBody.userCode,{
                    LOGIN_FAIL: 0,
                    IS_LOCKED: 'N',
                    UNLOCK_DATE: null
                },function (results, fields) {
                    //成功解锁
                    if(user['PWD'] === encryptPwd){
                        //密码匹配
                        res.json({ret_code: 0, ret_msg: '登录成功'});
                    }
                    res.json({ret_code: 0, ret_msg: '登录成功'});
                })
                //不允解锁
            } else {
                msg.success = false;
                msg.response = result.error('当前用户被锁定','USER IS LOCKED');
            }
        } else {

        }
    })
    return msg;
}

