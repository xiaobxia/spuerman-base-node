/**
 * Created by xiaobxia on 2017/7/3.
 */
const colors = require('colors');
const log4js = require('log4js');
const config = require('../../config');

const theme = {
    info: 'green',
    warn: 'yellow',
    trace: 'blue',
    error: 'red',
    fatal: 'rainbow'
};
colors.setTheme(theme);

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

let logger = {};
if (config.server.debug){
    for (let key in theme) {
        if (theme.hasOwnProperty(key)) {
            (function (key) {
                logger[key] = function (msg) {
                    log[key](colors[key](msg))
                }
            })(key);
        }
    }
} else {
    logger = log;
}
logger.debug = function (msg) {
    log.debug(msg)
};

module.exports = logger;
