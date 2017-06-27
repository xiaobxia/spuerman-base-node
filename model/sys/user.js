/**
 * Created by xiaobxia on 2017/6/26.
 */
const dbQuery = require('../../datebase').dbQuery;
const toSql = require('../../util/object').toSql;
module.exports = {
    getUser: function (res, userCode, callback) {
        dbQuery(
            `SELECT * FROM sys_user WHERE USER_CODE='${userCode}'`,
            callback
        );
    },
    updateUser: function (res, userCode, data, callback) {
        let dataString = toSql(data);
        dbQuery(
            `UPDATE sys_user SET ${dataString} WHERE USER_CODE='${userCode}'`,
            callback
        );
    }
}