/**
 * Created by xiaobxia on 2017/7/19.
 */
const co = require('co');
const BaseController = require('../base');
const RolePrivService = require('../../service/sys/rolePrivServer');

module.exports = class RolePrivController extends BaseController {
  /**
   * method post
   * api /sys/rolepriv/add
   * @param res
   * @param req
   * @param next
   */
  addPrivToRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let roles = {
          roleId: {type: 'number', required: true},
          privId: {type: 'number', required: true}
        };
        let requestData = {
          roleId: parseInt(req.body.roleId),
          privId: parseInt(req.body.privId)
        };
        self.validate(roles, requestData);
        connection = yield self.getPoolConnection();
        let privilegeService = new RolePrivService(connection);
        yield privilegeService.addPrivToRole(requestData.privId, requestData.roleId);
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
   * api /sys/rolepriv/:roleId/:privId
   * @param res
   * @param req
   * @param next
   */
  deletePrivInRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let roles = {
          roleId: {type: 'number', required: true},
          privId: {type: 'number', required: true}
        };
        let requestData = {
          roleId: parseInt(req.params.roleId),
          privId: parseInt(req.params.privId)
        };
        self.validate(roles, requestData);
        connection = yield self.getPoolConnection();
        let privilegeService = new RolePrivService(connection);
        yield privilegeService.deletePrivInRole(requestData.privId, requestData.roleId);
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
