/**
 * Created by xiaobxia on 2017/6/26.
 */
const dbQuery = require('../datebase').dbQuery;
module.exports = {
    //callback(error, results, fields);
    getUser: function (userCode, callback) {
        dbQuery(
            {
                sql: 'SELECT * FROM sys_user WHERE STATE="A" AND USER_CODE= ?',
                values: userCode
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
    },
    getUserRole: function (userId, callback) {
        dbQuery(
            {
                sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE=A',
                values: userId
            },
            callback
        );
    }
}