/**
 * Created by xiaobxia on 2017/6/26.
 */
const mysql = require('mysql');
const fs = require('fs-extra');
const config = JSON.parse(fs.readFileSync('./serverConfig.json'));
const result = require('./util/result');
//配置mysql，创建连接池
const pool = mysql.createPool(config.mysql);
function dbQuery(res ,sql, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json(result.dbError(err.code))
        } else {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.json(result.dbError(error.code))
                } else {
                    callback(results, fields);
                }
            })
        }
    });
}
module.exports = {
    dbQuery: dbQuery
};
