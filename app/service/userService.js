/**
 * Created by xiaobxia on 2017/7/4.
 */
const md5 = require('md5');
const logger = require('../common/logger');
const pool = require('../common/mysqlPool');

const userORM = require('../model/orm/sys/user');
const errorModel = require('../model/result/errorModel');
const userConst = require('../model/const/user');

exports.changePwd = function (user, oldPassword, newPassword, controllerCallback) {
    //验证密码
    let encryptPwd = md5(`${user['USER_CODE']}#${oldPassword}`);
    if (encryptPwd !== user['PWD']) {
        controllerCallback(errorModel.baseError('用户原密码错误', 'USER_ORIGIN_PWD_ERROR'))
        return;
    }
    //密码不能相同
    if (oldPassword === newPassword) {
        controllerCallback(errorModel.baseError('密码相同', 'USER_CHANGE_PWD_ORIGIN_AND_NEW_ARE_SAME_ERROR'))
        return;
    }
    //密码长度
    if (newPassword.length < 5 || newPassword.length > 20) {
        controllerCallback(errorModel.baseError('密码长度不合规', 'USER_PWD_LENGTH_ERROR'))
        return;
    }
    pool.getConnection(function (error, connection) {
        if (error) {
            logger.error(error);
            controllerCallback(errorModel.dbError(error.code));
        } else {
            userORM.updateUser(connection, {USER_ID: user['USER_ID']},
                {PWD: md5(`${user['USER_CODE']}#${newPassword}`)},
                function (error, results, fields) {
                    if (error) {
                        logger.error(error);
                        controllerCallback(errorModel.dbError(error.code));
                    } else {
                        logger.info(`${user['USER_CODE']}修改了密码 ** 新密码: ${newPassword}`)
                        controllerCallback(null,true)
                    }
                }
            )
        }
    })
};

exports.getUserById = function (userId,controllerCallback) {
    pool.getConnection(function (error, connection) {
        if (error) {
            logger.error(error);
            controllerCallback(errorModel.dbError(error.code));
        } else {
            userORM.getUser(connection,{USER_ID: userId},function (error,results,fields) {
                if (error) {
                    logger.error(error);
                    controllerCallback(errorModel.dbError(error.code));
                } else {
                    controllerCallback(null, results)
                }
            })
        }
    })
};