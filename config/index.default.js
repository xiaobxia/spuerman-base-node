/**
 * Created by xiaobxia on 2017/7/26.
 */
const path = require('path');
module.exports = {
  project: {
    projectName: ""
  },
  server: {
    debug: true,
    port: 8080,
    //务必修改
    session_secret: "secret",
    root: path.resolve(__dirname, '../')
  },
  //mysql配置
  mysql: {
    host: "",
    user: "",
    password: "",
    database: "",
    connectionLimit: 10,
    //使返回的date为字符串
    dateStrings: true
  }
};
