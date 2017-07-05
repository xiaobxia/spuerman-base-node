/**
 * Created by xiaobxia on 2017/6/27.
 */
const moment = require('moment');
const pool = require('../common/mysqlPool');
const userORM = require('../model/orm/sys/user');
/**
 * method
 * api sys/test
 * @param req
 * @param res
 * @param next
 */
exports.test = function (req,res,next) {
    let index = parseInt(req.query.pageIndex);
    let offset = parseInt(req.query.pageSize);
    let start  = (index-1)*offset;
    pool.getConnection(function (error, connection) {
       userORM.getUsers(connection,start,offset,function (err,result) {
           res.json(result)
       })
    });
};