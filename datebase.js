/**
 * Created by xiaobxia on 2017/6/26.
 */
const mysql = require('mysql');
const fs = require('fs-extra');
const config = JSON.parse(fs.readFileSync('./serverConfig.json'));
//配置mysql
const pool = mysql.createPool(config.mysql);
function dbQuery(sql, queryCallbackCreater, connectErrCallback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connectErrCallback && connectErrCallback();
        }
        connection.query(sql,queryCallbackCreater(connection))
    });
}
module.exports = {
    dbQuery: dbQuery
};
