/**
 * Created by xiaobxia on 2017/7/3.
 */
const log4js = require('log4js');
const path = require('path');
const config = require('../../config');
const loggerConfig = config.logger;
// 级别
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

log4js.configure({
  appenders: [
    {type: 'console'},
    {
      type: 'file',
      filename: path.resolve(loggerConfig.dir, loggerConfig.fileName),
      category: 'cheese',
      encoding: 'utf-8'
    }
  ],
  //代替console
  replaceConsole: true
});
const log = log4js.getLogger('cheese');
//虽然分了情况，但是代码中判断debug，运行速度会快一点
log.setLevel(config.server.debug ? loggerConfig.debugLogLevel : loggerConfig.productLogLevel);
module.exports = log;
