/**
 * Created by xiaobxia on 2017/6/23.
 */
const userModel = require('../../model/sys/user');
const result = require('../../service/result');
const colors = require('colors');
const moment = require('moment');
const md5 = require('md5');

module.exports = {
    method: 'post',
    api: 'sys/login',
    response: function (req, res) {
        let postBody = req.body;
        let encryptPwd = md5(`${postBody.userCode}#${postBody.pwd}`);
        userModel.getUser(postBody.userCode,function (error, results, fields) {
            if(error){
                res.json(result.dbError(error.code))
            }
            //用户不存在
            if(!results){
                console.log('请求用户名不存在'.yellow)
                res.json(result.error('用户名或密码错误','USER_NAME_OR_PWD_ERROR'));
            }
            let user = results[0];
            //判断锁定
            if(user['IS_LOCKED']==='Y'){
                console.log('此用户被锁定'.yellow)
                //判断是否到达解锁时间
                if (moment().isAfter(user['UNLOCK_DATE'])){
                    userModel.updateUser(postBody.userCode,{
                        LOGIN_FAIL: 0,
                        IS_LOCKED: 'N',
                        UNLOCK_DATE: null
                    })
                } else {
                    res.json(result.error('当前用户被锁定','USER IS LOCKED'))
                }
            }
            if(user['PWD'] === encryptPwd){
                res.json({ret_code: 0, ret_msg: '登录成功'});
            }
       })
    }
}