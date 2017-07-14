/**
 * Created by xiaobxia on 2017/7/6.
 */
const logger = require('../common/logger');

module.exports = function (req, res, next) {
  let ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip) {
    logger.trace('ip: ' + ip);
  }
  next();
};

