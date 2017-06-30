/**
 * Created by xiaobxia on 2017/6/30.
 */
const userDb = require('../dao/sys/user');
module.exports = {
    getUserRole(userId, callback) {
        userDb.getUserRole(userId,function (error, results, fields) {
            if (error) {
                let resError = new Error('数据库错误');
                resError.code = error.code;
                callback(resError);
            }else {
                console.log('1',results);
            }
        })
    }
};