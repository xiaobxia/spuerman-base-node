/**
 * Created by xiaobxia on 2017/6/30.
 */
const md5 = require('md5');
const sessionConst = require('../const/session');
module.exports = class Session {
    constructor(session) {
        if (session) {
            this.id = session.id;
            this[sessionConst.SESSION_LOGIN_USER] = session[sessionConst.SESSION_LOGIN_USER];
            this[sessionConst.SESSION_LOGIN_USER_SESSION] = session[sessionConst.SESSION_LOGIN_USER_SESSION];
        }
    }
    getAttribute(key) {
        return this[key];
    }

    setAttribute(key, value) {
        this[key] = value;
    }

    getId() {
        return this.id;
    }
}
;