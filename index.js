/**
 * Created by xiaobxia on 2017/6/23.
 */
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const colors = require('colors');
const opn = require('opn');
const bodyParser = require("body-parser");

/*
 const cookieParser = require('cookie-parser');
 const session = require('express-session');
 */
const cookieSession = require('cookie-session');
let app = module.exports = express();

//得到服务器配置
const config = JSON.parse(fs.readFileSync('./serverConfig.json'));
const projectName = config.projectName;
const port = config.port || 4000;
if (!projectName) {
    console.error('projectName is required'.red);
    process.exit();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({
    secret: 'codi',
    name: projectName,
    maxAge: 80000,
    httpOnly: true
}));

//打印信息请求
app.use(function (req, res, next) {
    console.log('query', req.query)
    console.log('method', req.method)
    console.log('session', req.session);
    next();
});

/*
 app.use(cookieParser('codi'));
 app.use(session({
 secret: 'codi',
 name: projectName,   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
 cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
 resave: false,
 saveUninitialized: false,
 }));
 */

//系统的接口
let sysDir = path.resolve(__dirname, './controllers/sys');
fs.readdirSync(sysDir).forEach(function (file) {
    let connector = require(path.resolve(sysDir, file))
    let api = `/${projectName}/${connector.api}`;
    let method = connector.method;
    app[method](api, connector.response);
});

//测试接口
(function () {
    let connector = require(path.resolve(__dirname, './controllers/test'));
    let api = `/${projectName}/${connector.api}`;
    console.log(api)
    let method = connector.method;
    console.log(method)
    console.log(connector.response)
    app[method](api, connector.response);
})();


//启动服务器
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
    //opn(uri);
})
