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

  /**
   * method get
   * api /sys/role/userrole/:id
   * @param req
   * @param res
   * @param next
   */
  getRolesByUserId() {
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
        let roleService = new RoleService(connection);
        let role = yield roleService.getRolesByUserId(requestData.id);
        connection.release();
        let result = self.result();
        result.setResult(role);
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
   * api sys/role/add
   * @param req
   * @param res
   * @param next
   */
  addRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          roleCode: req.body.roleCode,
          roleName: req.body.roleName,
          description: req.body.description
        };
        self.validate(
          {
            roleCode: {required: true, type: 'string'},
            roleName: {required: true, type: 'string'},
            description: {required: true, type: 'string'}
          },
          requestData
        );
        connection = yield self.getPoolConnection();
        let roleService = new RoleService(connection);
        yield roleService.addRole(req.body);
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
   * api sys/role/:id
   * @param req
   * @param res
   * @param next
   */
  getRoleById() {
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
        let roleService = new RoleService(connection);
        let role = yield roleService.getRoleById(requestData.id);
        connection.release();
        let result = self.result();
        result.setResult(role);
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
   * api /sys/role/update
   * @param req
   * @param res
   * @param next
   */
  updateRole() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let roleInfo = req.body;
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let roleService = new RoleService(connection);
        yield roleService.updateRole(roleInfo);
        connection.release();
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
   * api /sys/role/delete/:id
   * @param req
   * @param res
   * @param next
   */
  deleteRoleById() {
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
        let roleService = new RoleService(connection);
        yield roleService.deleteRoleById(requestData.id);
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
