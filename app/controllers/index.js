/**
 * Created by xiaobxia on 2017/7/3.
 */
const login = require('./sys/login');
const privilege = require('./sys/privilege');
const user = require('./sys/user');

const test = require('./test');

let controllers = [];
module.exports = controllers.concat(login,privilege,user,test)