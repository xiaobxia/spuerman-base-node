/**
 * Created by xiaobxia on 2017/6/26.
 */
const dbQuery = require('../datebase').dbQuery;
module.exports = {
    //callback(error, results, fields);
    getUser: function (userCode, userState, callback) {
        dbQuery(
            {
                sql: 'SELECT * FROM sys_user WHERE USER_CODE= ? AND STATE= ?',
                values: [userCode, userState]
            },
            callback
        );
    },
    updateUser: function (userCode, data, callback) {
        dbQuery(
            {
                sql: 'UPDATE sys_user SET ? WHERE USER_CODE= ?',
                values: [data, userCode]
            },
            callback
        );
    }
}