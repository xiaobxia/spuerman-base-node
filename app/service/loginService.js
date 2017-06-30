/**
 * Created by xiaobxia on 2017/6/27.
 */
const colors = require('colors');
const moment = require('moment');
const async = require('async');
const md5 = require('md5');
const userDb = require('../dao/sys/user');
const userConst = require('../model/const/user');

function getUser(userCode, callback) {
    userDb.getUser(userCode, userConst.USER_STATE_A, function (error, results, fields) {
        //数据库错误
        if (error) {
            let resError = new Error('数据库错误');
            resError.code = error.code;
            callback(resError);
        }
        if (!results.length) {
            console.log('请求用户名不存在'.yellow)
            let resError = new Error('用户名或密码错误');
            resError.code = 'USER_NAME_OR_PWD_ERROR'
            callback(resError);
        } else {
            callback(null, results[0]);
        }
    })
}
function pwdErrorUpdate(userCode, data, callback) {
    userDb.updateUser(userCode, data, function (error, results, fields) {
        let resError;
        if (error) {
            resError = new Error('数据库错误');
            resError.code = error.code;
        } else {
            resError = new Error('用户名或密码错误');
            resError.code = 'USER_NAME_OR_PWD_ERROR';
        }
        callback(resError);
    })
}
module.exports = function (postBody, controllersCallback) {
    async.waterfall([
        //查用户数据
        function (callback) {
            getUser(postBody.userCode, callback)
        },
        //判断锁定
        function (user, callback) {
            if (user['IS_LOCKED'] === 'Y') {
                //判断是否到达解锁时间
                if (moment().isAfter(user['UNLOCK_DATE'])) {
                    //解锁
                    userDb.updateUser(postBody.userCode, {
                        LOGIN_FAIL: 0,
                        IS_LOCKED: 'N',
                        UNLOCK_DATE: null
                    }, function (error, results, fields) {
                        if (error) {
                            let resError = new Error('数据库错误');
                            resError.code = error.code;
                            callback(resError);
                        }
                        //查询最新数据
                        getUser(postBody.userCode, callback);
                    })
                } else {
                    console.log('此用户被锁定'.yellow)
                    let resError = new Error('当前用户被锁定');
                    resError.code = 'USER IS LOCKED';
                    callback(resError);
                }
            } else {
                callback(null, user);
            }
        },
        //判断密码
        function (user, callback) {
            //生成加密码
            let encryptPwd = md5(`${postBody.userCode}#${postBody.pwd}`);
            if (user['PWD'] === encryptPwd) {
                //密码匹配，清空尝试次数
                userDb.updateUser(postBody.userCode, {
                    LOGIN_FAIL: 0,
                    IS_LOCKED: 'N',
                    UNLOCK_DATE: null
                }, function (error, results, fields) {
                    if (error) {
                        let resError = new Error('数据库错误');
                        resError.code = error.code;
                        callback(resError);
                    }
                    //这里不再查询最新数据了
                    callback(null, user);
                })
            } else {
                //密码不匹配
                if (user['LOGIN_FAIL'] > userConst.MAX_LOGIN_FAIL) {
                    //失败大于6次
                    console.log(user['LOGIN_FAIL'])
                    pwdErrorUpdate(postBody.userCode, {
                        IS_LOCKED: 'Y',
                        UNLOCK_DATE: moment().add(LOCK_USER_MINUTES, 'minutes').format('YYYY-M-D HH:mm:ss')
                    },callback);
                } else {
                    //失败次数加1
                    pwdErrorUpdate(postBody.userCode, {
                        LOGIN_FAIL: 1 + user['LOGIN_FAIL'],
                    },callback);
                }
            }
        }
    ], controllersCallback);
};