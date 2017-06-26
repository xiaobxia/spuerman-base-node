/**
 * Created by xiaobxia on 2017/6/26.
 */
const  dbQuery = require('../../datebase').dbQuery;
module.exports = {
    getUser: function (userCode, callback) {
        dbQuery(`SELECT * FROM sys_user WHERE USER_CODE='${userCode}'`, function (connection) {
            return function (error, results, fields) {
                connection.release();
                callback(error, results, fields);
            }
        });
    },
    updateUser: function (userCode, data, callback) {
        
    }
}