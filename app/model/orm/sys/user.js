/**
 * Created by xiaobxia on 2017/6/26.
 */
const logger = require('../../../common/logger');
module.exports = {
    model: class User {

    },
    //callback(error, results, fields);
    getUserByUserCode: function (connection, userCode, callback) {
        let query = connection.query(
            {
                sql: 'SELECT * FROM sys_user WHERE STATE="A" AND USER_CODE= ?',
                values: userCode
            },
            callback
        );
        logger.trace('sql: '+query.sql);
    },
    updateUser: function (connection, user, data, callback) {
        let query = connection.query(
            {
                sql: 'UPDATE sys_user SET ? WHERE ?',
                values: [data, user]
            },
            callback
        );
        logger.trace('sql: '+query.sql);
    },
    getUserRole: function (connection, userId, callback) {
        let query = connection.query(
            {
                sql: 'SELECT ROLE_ID FROM sys_user_role WHERE USER_ID= ? AND STATE="A"',
                values: userId
            },
            callback
        );
        logger.trace('sql: '+query.sql);
    },
    getUser: function (connection, data,callback) {
        let query = connection.query(
            {
                sql: 'SELECT * FROM sys_user WHERE STATE="A" AND ?',
                values: data
            },
            callback
        );
        logger.trace('sql: '+query.sql);
    },
    getUserCount: function (connection,callback) {
        let query = connection.query('SELECT COUNT(*) FROM sys_user WHERE STATE="A"',callback);
        logger.trace('sql: '+query.sql);
    }
};