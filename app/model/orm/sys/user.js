/**
 * Created by xiaobxia on 2017/6/26.
 */
module.exports = {
    model: class User {

    },
    //callback(error, results, fields);
    getUserByUserCode: function (connection, userCode, callback) {
        connection.query(
            {
                sql: 'SELECT * FROM sys_user WHERE STATE="A" AND USER_CODE= ?',
                values: userCode
            },
            callback
        );
    },
    updateUser: function (connection, userCode, data, callback) {
        connection.query(
            {
                sql: 'UPDATE sys_user SET ? WHERE USER_CODE= ?',
                values: [data, userCode]
            },
            callback
        );
    },
    getUserRole: function (connection, userId, callback) {
        connection.query(
            {
                sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE="A"',
                values: userId
            },
            callback
        );
    }
}