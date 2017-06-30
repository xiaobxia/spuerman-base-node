/**
 * Created by xiaobxia on 2017/6/30.
 */
const dbQuery = require('../datebase').dbQuery;
module.exports = {
    //callback(error, results, fields)
    insertSession: function (data, callback) {
        console.log(data)
        dbQuery(
            {
                sql: 'INSERT INTO sys_user_session SET ?',
                values: data
            },
            callback
        );
    }
}