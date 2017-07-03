/**
 * Created by xiaobxia on 2017/7/3.
 */
const mysql = require('mysql');
const config = require('../../config');
//配置mysql，创建连接池
const pool = mysql.createPool(config.mysql);
module.exports = pool;

// 把对链接池的操作交给业务去做，一次请求使用一个连接，如果每次查询都新开一个连接，对遇到连接池没有连接，响应被阻塞的情况
// function dbQuery(sql, callback) {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             callback(err,null,null)
//         } else {
//             connection.query(sql, function (error, results, fields) {
//                 connection.release();
//                 callback(error, results, fields);
//             })
//         }
//     });
// }
// module.exports = {
//     dbQuery: dbQuery
// };