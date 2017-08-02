/**
 * Created by xiaobxia on 2017/7/21.
 */
const co = require('co');
const BaseController = require('../base');
const UserRoleService = require('../../service/sys/userRoleService');
module.exports = class UserRoleController extends BaseController {
  /**
   * method post
   * api /sys/userrole/add
   * @param res
   * @param req
   * @param next
   */
  addUserToRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let roles = {
          roleId: {type: 'number', required: true},
          userId: {type: 'number', required: true}
        };
        let requestData = {
          roleId: parseInt(req.body.roleId),
          userId: parseInt(req.body.userId)
        };
        self.validate(roles, requestData);
        connection = yield self.getPoolConnection();
        let userRoleService = new UserRoleService(connection);
        yield userRoleService.addUserToRole(requestData.userId, requestData.roleId);
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
   * method delete
   * api /sys/userrole/:userId/:roleId
   * @param res
   * @param req
   * @param next
   */
  deleteUserInRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let roles = {
          roleId: {type: 'number', required: true},
          userId: {type: 'number', required: true}
        };
        let requestData = {
          roleId: parseInt(req.params.roleId),
          userId: parseInt(req.params.userId)
        };
        self.validate(roles, requestData);
        connection = yield self.getPoolConnection();
        let userRoleService = new UserRoleService(connection);
        yield userRoleService.deleteUserInRole(requestData.userId, requestData.roleId);
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
