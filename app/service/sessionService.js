/**
 * Created by xiaobxia on 2017/6/30.
 */
const moment = require('moment');
const sessionDb = require('../dao/sys/userSession');
module.exports = function (user,token,ua,callback) {
    let now = moment().format('YYYY-M-D HH:mm:ss');
    let data = {
        TOKEN: token,
        UA: ua,
        USER_ID: user['USER_ID'],
        STATE: user['STATE'],
        CREATE_DATE: now,
        LAST_UPDATE_DATE: now
    };
    sessionDb.insertSession(data,function (error, results, fields) {
        if (error) {
            let resError = new Error('数据库错误');
            resError.code = error.code;
            callback(resError);
        } else {
            callback(null, data)
        }
    })
}