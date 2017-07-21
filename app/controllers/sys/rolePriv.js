/**
 * Created by xiaobxia on 2017/7/19.
 */
const co = require('co');
const BaseController = require('../base');
const RolePrivService = require('../../service/rolePrivServer');

module.exports = class RolePrivController extends BaseController {
  /**
   * method post
   * api sys/rolepriv/add
   * @param res
   * @param req
   * @param next
   */
  addPrivToRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let roles = {
        roleId: {type: 'number', required: true},
        privId: {type: 'number', required: true}
      };
      let requestData = {
        roleId: parseInt(req.body.roleId),
        privId: parseInt(req.body.privId)
      };
      let illegalMsg = self.validate(roles, requestData);
      if (illegalMsg === undefined) {
        let result = self.result();
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let privilegeService = new RolePrivService(connection);
          yield privilegeService.addPrivToRole(requestData.privId, requestData.roleId);
          connection.release();
          res.json(result);
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

  /**
   * method delete
   * api sys/rolepriv/:roleId/:privId
   * @param res
   * @param req
   * @param next
   */
  deletePrivInRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let roles = {
        roleId: {type: 'number', required: true},
        privId: {type: 'number', required: true}
      };
      let requestData = {
        roleId: parseInt(req.params.roleId),
        privId: parseInt(req.params.privId)
      };
      let illegalMsg = self.validate(roles, requestData);
      if (illegalMsg === undefined) {
        let result = self.result();
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let privilegeService = new RolePrivService(connection);
          yield privilegeService.deletePrivInRole(requestData.privId, requestData.roleId);
          connection.release();
          res.json(result);
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
