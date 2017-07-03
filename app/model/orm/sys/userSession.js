/**
 * Created by xiaobxia on 2017/6/30.
 */
module.exports = {
    model: class UserSession {
    },
    //callback(error, results, fields)
    insertSession: function (connection, data, callback) {
        connection.query(
            {
                sql: 'INSERT INTO sys_user_session SET ?',
                values: data
            },
            callback
        );
    }
}