/**
 * Created by xiaobxia on 2017/6/30.
 */
module.exports = {
    project: {
        projectName: "your-business"
    },
    server: {
        debug: true,
        port: 4000,
        session_secret: 'codi'
    },
    mysql: {
        host: "localhost",
        user: "root",
        password: "chenlingjie214",
        database: "test",
        connectionLimit: 10
    }
};