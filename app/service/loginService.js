/**
 * Created by xiaobxia on 2017/6/27.
 */
const moment = require('moment');
const async = require('async');
const md5 = require('md5');

const logger = require('../common/logger');
const pool = require('../common/mysqlPool');

const userORM = require('../model/orm/sys/user');
const errorModel = require('../model/result/errorModel');
const userConst = require('../model/const/user');

function getUser(connection, userCode, callback) {
    userORM.getUserByUserCode(connection, userCode, function (error, results, fields) {
        //数据库错误
        if (error) {
            logger.error(error);
            callback(errorModel.dbError(error.code));
        }
        if (!results.length) {
            logger.warn('请求用户名不存在')
            callback(errorModel.baseError('用户名或密码错误', 'USER_NAME_OR_PWD_ERROR'));
        } else {
            callback(null, results[0]);
        }
    })
}
function pwdErrorUpdate(connection, userCode, data, callback) {
    userORM.updateUser(connection, {USER_CODE:userCode}, data,
        function (error, results, fields) {
            if (error) {
                logger.error(error);
                callback(errorModel.dbError(error.code));
            } else {
                callback(errorModel.baseError('用户名或密码错误', 'USER_NAME_OR_PWD_ERROR'));
            }
        })
}
//TODO 验证是否可以使用passport模块
module.exports = function (postBody, controllerCallback) {
    pool.getConnection(function (error, connection) {
        async.waterfall(
            [
                //检验连接
                function (callback) {
                    if (error) {
                        logger.error(error);
                        callback(errorModel.dbError(error.code));
                    } else {
                        callback(null);
                    }
                },
                //查询用户
                function (callback) {
                    getUser(connection, postBody.userCode, callback);
                },
                //判断锁定
                function (user, callback) {
                    //如果上锁了
                    if (user['IS_LOCKED'] === 'Y') {
                        //判断是否到达解锁时间
                        if (moment().isAfter(user['UNLOCK_DATE'])) {
                            //解锁
                            userDb.updateUser(connection, {USER_CODE:postBody.userCode}, {
                                LOGIN_FAIL: 0,
                                IS_LOCKED: 'N',
                                UNLOCK_DATE: null
                            }, function (error, results, fields) {
                                if (error) {
                                    callback(errorModel.dbError(error.code));
                                }
                                //查询解锁后的数据
                                getUser(connection, postBody.userCode, callback);
                            })
                        } else {
                            logger.warn('此用户被锁定')
                            callback(errorModel.baseError('当前用户被锁定', 'USER IS LOCKED'));
                        }
                    } else {
                        callback(null, user);
                    }
                },
                //判断密码
                function (user, callback) {
                    //生成加密码
                    let encryptPwd = md5(`${postBody.userCode}#${postBody.pwd}`);
                    //判断密码是否相同
                    if (user['PWD'] === encryptPwd) {
                        //密码匹配，清空尝试次数
                        userORM.updateUser(connection, {USER_CODE:postBody.userCode}, {
                            LOGIN_FAIL: 0,
                            IS_LOCKED: 'N',
                            UNLOCK_DATE: null
                        }, function (error, results, fields) {
                            if (error) {
                                callback(errorModel.dbError(error.code));
                            }
                            //这里不再查询最新数据了
                            callback(null, user);
                        })
                    } else {
                        //密码不匹配
                        if (user['LOGIN_FAIL'] > userConst.MAX_LOGIN_FAIL) {
                            //失败大于6次
                            logger.info('此用户登录失败次数：' + user['LOGIN_FAIL']);
                            pwdErrorUpdate(connection, postBody.userCode, {
                                IS_LOCKED: 'Y',
                                UNLOCK_DATE: moment().add(LOCK_USER_MINUTES, 'minutes').format('YYYY-M-D HH:mm:ss')
                            }, callback);
                        } else {
                            //失败次数加1
                            pwdErrorUpdate(connection, postBody.userCode, {
                                LOGIN_FAIL: 1 + user['LOGIN_FAIL'],
                            }, callback);
                        }
                    }
                }
            ],
            function (error, user) {
                connection.release();
                controllerCallback(error, user);
            }
        );
    });
};