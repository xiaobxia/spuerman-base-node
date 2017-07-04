/**
 * Created by xiaobxia on 2017/6/30.
 */
const logger = require('../../../common/logger');
module.exports = {
    model: class UserSession {
    },
    //callback(error, results, fields)
    insertSession: function (connection, data, callback) {
        let query = connection.query(
            {
                sql: 'INSERT INTO sys_user_session SET ?',
                values: data
            },
            callback
        );
        logger.trace('sql: '+query.sql);
    }
}