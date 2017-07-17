/**
 * Created by xiaobxia on 2017/6/29.
 */
module.exports = class LoginModel {
  getLogin() {
    return this.login;
  }

  getUserCode() {
    return this.userCode;
  }

  getUserName() {
    return this.userName;
  }

  getToken() {
    return this.token;
  }

  setLogin(login) {
    return this.login = login;
  }

  setUserCode(userCode) {
    return this.userCode = userCode;
  }

  setUserName(userName) {
    return this.userName = userName;
  }

  setToken(token) {
    return this.token = token;
  }
}
