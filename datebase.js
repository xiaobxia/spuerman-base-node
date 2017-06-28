/**
 * Created by xiaobxia on 2017/6/26.
 */
const mysql = require('mysql');
const fs = require('fs-extra');
const config = JSON.parse(fs.readFileSync('./serverConfig.json'));
const result = require('./util/result');
//配置mysql，创建连接池
const pool = mysql.createPool(config.mysql);
function dbQuery(sql, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err,null,null)
        } else {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                callback(error, results, fields);
            })
        }
    });
}
module.exports = {
    dbQuery: dbQuery
};
