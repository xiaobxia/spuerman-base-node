/**
 * Created by xiaobxia on 2017/7/3.
 */
const log4js = require('log4js');
const config = require('../../config');
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
      filename: 'logs/cheese.log',
      category: 'cheese',
      encoding: 'utf-8'
    }
  ],
  //代替console
  replaceConsole: true
});
const log = log4js.getLogger('cheese');
log.setLevel(config.server.debug ? 'ALL' : 'ERROR');
module.exports = log;
