/**
 * Created by xiaobxia on 2017/7/4.
 */
const co = require('co');
const BaseController = require('../base');
const UserService = require('../../service/sys/userService');
const PrivilegeService = require('../../service/sys/privilegeService')
module.exports = class UserController extends BaseController {
  /**
   * method get
   * api /sys/user/:id
   * @param req
   * @param res
   * @param next
   */
  getUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.params.id)
        };
        self.validate(
          {id: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let user = yield userService.getUserById(requestData.id);
        connection.release();
        let result = self.result();
        result.setResult(user);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/usersCount
   * @param req
   * @param res
   * @param next
   */
  getUsersCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let count = yield userService.getUsersCount();
        connection.release();
        let result = self.result();
        result.setResult(count);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/users
   * @param req
   * @param res
   * @param next
   */
  getUsers() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let users = yield userService.getUsers(pagingModel.start, pagingModel.offset);
        connection.release();
        let result = self.result();
        result.setResult(users);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method post
   * api /sys/user/checkUserMenuPriv
   * @param req
   * @param res
   * @param next
   */
  checkUserMenuPriv() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let rules = {
          path: {type: 'string', required: true}
        };
        self.validate(rules, req.body);
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let user = self.getSessionUser(req.session);
        let ifPass = yield privilegeService.checkUserMenuPriv(user['USER_ID'], req.body.path);
        connection.release();
        let result = self.result();
        result.setResult(ifPass);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method post
   * api /sys/user/changePwd
   * @param req
   * @param res
   * @param next
   */
  changePwd() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let postData = req.body;
        let rules = {
          oldPwd: {type: 'string', required: true},
          newPwd: {type: 'string', required: true}
        };
        self.validate(rules, postData);
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let user = self.getSessionUser(req.session);
        yield userService.changePwd(user, postData.oldPwd, postData.newPwd);
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/userrole/:id
   * @param req
   * @param res
   * @param next
   */
  getUsersByRoleId() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.params.id)
        };
        self.validate(
          {id: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let user = yield userService.getUsersByRoleId(requestData.id);
        connection.release();
        let result = self.result();
        result.setResult(user);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method post
   * api /sys/user/add
   * @param req
   * @param res
   * @param next
   */
  addUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          userCode: req.body.userCode
        };
        self.validate(
          {userCode: {required: true, type: 'string', min: 4}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        yield userService.addUser(req.body);
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method post
   * api /sys/user/update
   * @param req
   * @param res
   * @param next
   */
  updateUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        yield userService.updateUser(req.body);
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/lock/:id
   * @param req
   * @param res
   * @param next
   */
  lockUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.params.id)
        };
        self.validate(
          {id: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let adminUser = self.getSessionUser(req.session);
        if (requestData.id === adminUser['USER_ID']) {
          self.throwBaseError('不能锁定自己', 'USER_LOCK_SELF_ERROR');
        } else {
          yield userService.lockUser(requestData.id);
        }
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/unlock/:id
   * @param req
   * @param res
   * @param next
   */
  unlockUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.params.id)
        };
        self.validate(
          {id: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        yield userService.unlockUser(requestData.id);
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/resetPwd/:id
   * @param req
   * @param res
   * @param next
   */
  resetPwd() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.params.id)
        };
        self.validate(
          {id: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        yield userService.resetPwd(requestData.id);
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  /**
   * method get
   * api /sys/user/delete
   * @param req
   * @param res
   * @param next
   */
  deleteUser() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          userId: parseInt(req.query.userId)
        };
        self.validate(
          {userId: {required: 'true', type: 'number'}},
          requestData
        );
        connection = yield self.getPoolConnection();
        let userService = new UserService(connection);
        let adminUser = self.getSessionUser(req.session);
        if (requestData.userId === adminUser['USER_ID']) {
          self.throwBaseError('不能删除自己', 'USER_DELETE_SELF_ERROR');
        } else {
          yield userService.deleteUserById(requestData.userId);
        }
        connection.release();
        let result = self.result();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }
};
