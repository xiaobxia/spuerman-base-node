## 功能

- ✔ 用户管理
- ✔ 角色管理
- ✔ 权限管理
- ✔ 参数管理
- ✔ 日志审计
- ✔ 文件上传
- ✔ 图片管理

## 准备

1. mysql数据库：执行sql文件夹下的脚本

## 配置

把config文件夹下的index.default.js文件重命名为index.js，并修改文件中的配置。

## 启动

``` shell
cnpm install
cnpm run server
```

## 上传文件

上传文件功能的配置不在配置文件中添加，而是在app中添加，进入app后你需要：
1. 添加文件桶 
2. 添加参数QINIU_SECRET_KEY、QINIU_ACCESS_KEY（分别对应你的七牛secretKey和accessKey）




