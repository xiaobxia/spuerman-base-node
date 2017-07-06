/**
 * Created by xiaobxia on 2017/7/6.
 */
const logger = require('../common/logger');

module.exports = function (req,res,next) {
    logger.trace('into: '+req.path);
    next();
};
