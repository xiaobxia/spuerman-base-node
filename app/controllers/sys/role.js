/**
 * Created by xiaobxia on 2017/7/17.
 */
const co = require('co');
const BaseController = require('../base');
const RoleService = require('../../service/roleService');
module.exports = class RoleController extends BaseController {
  /**
   * method get
   * api sys/role/rolesCount
   * @param req
   * @param res
   * @param next
   */
  getRolesCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let roleService = new RoleService(connection);
        let count = yield roleService.getRolesCount();
        connection.release();
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
   * api /sys/role/roles
   * @param req
   * @param res
   * @param next
   */
  getRoles() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let roleService = new RoleService(connection);
        let roles = yield roleService.getRoles(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(roles);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        next(error);
      }
    });
  }

  getUserRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let requestData = {
        id: parseInt(req.params.id)
      };
      let illegalMsg = self.validate(
        {id: {required: 'true', type: 'number'}},
        requestData
      );
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();

        } catch (error) {
          if (connection) {
            connection.release();
          }
          next(error);
        }
      } else {
        let msg = illegalMsg[0];
        next(self.parameterError(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }
};
