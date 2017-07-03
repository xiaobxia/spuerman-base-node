/**
 * Created by xiaobxia on 2017/6/23.
 */
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const opn = require('opn');
const bodyParser = require("body-parser");


const cookieParser = require('cookie-parser');
const session = require('express-session');

const logger = require('./common/logger');
const requestLog = require('./middlewares/requestLog')

//const cookieSession = require('cookie-session');
const config = require('../config/index');
let app = module.exports = express();

//得到服务器配置
const projectName = config.project.projectName;
const port = config.server.port || 4000;
if (!projectName) {
    logger.error('projectName is required');
    process.exit();
}
//路由对象
let router = express.Router();

//请求中间件
app.use(require('method-override')());

//post数据中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//cookie-session中间件
// app.use(cookieSession({
//     secret: 'codi',
//     name: projectName,
//     maxAge: 80000,
//     httpOnly: true
// }));

//cookie和session的中间件
app.use(cookieParser(config.server.session_secret));
app.use(session({
    /*
    genid: function(req) {
        return genuuid() // use UUIDs for session IDs
    },
    */
    secret: config.server.session_secret,
    name: projectName,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 80000, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
}));


//打印信息请求
app.use(requestLog);

//路由部分
let controllers = require('./controllers');
controllers.forEach(function (connector) {
    let api = `/${connector.api}`;
    let method = connector.method;
    logger.info(`api:  ${api}  **  method:  ${method}`);
    router[method](api, connector.response);
});
app.use(`/${projectName}`,router);

//404错误
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

//启动服务器
module.exports = app.listen(port, function (err) {
    if (err) {
        logger.debug(err)
        return
    }
    let uri = 'http://localhost:' + port;
    logger.fatal('Listening at ' + uri)
})
