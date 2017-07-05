/**
 * Created by xiaobxia on 2017/6/27.
 */
const moment = require('moment');
/**
 * method
 * api sys/test
 * @param req
 * @param res
 * @param next
 */
exports.test = function (req,res,next) {
    res.json(req.headers)
};