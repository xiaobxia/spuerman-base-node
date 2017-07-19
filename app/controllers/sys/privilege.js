/**
 * Created by xiaobxia on 2017/6/30.
 */
const co = require('co');
const BaseController = require('../base');
const PrivilegeService = require('../../service/privilegeService');

module.exports = class PrivilegeController extends BaseController {
  /**
   * method get
   * api sys/priv/menu
   * @param res
   * @param req
   * @param next
   */
  menu() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let user = self.getSessionUser(req.session);
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let menus = yield privilegeService.getUserMenu(user['USER_ID']);
        connection.release();
        result.setResult(createMenu(menus));
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }

  /**
   * method get
   * api sys/priv/:id
   * @param req
   * @param res
   * @param next
   */
  getPrivById() {
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
          let privilegeService = new PrivilegeService(connection);
          let priv = yield privilegeService.getPrivById(requestData.id);
          connection.release();
          result.setResult(priv);
          res.json(result);
        } catch (error) {
          if (connection) {
            connection.release();
          }
          if (error.type === 'user') {
            result.setSuccess(false);
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
            res.json(result);
          } else {
            next(error);
          }
        }
      } else {
        let msg = illegalMsg[0];
        next(self.parameterError(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }

  /**
   * method get
   * api sys/priv/privsCount
   * @param req
   * @param res
   * @param next
   */
  getPrivsCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let count = yield privilegeService.getPrivsCount();
        connection.release();
        result.setResult(count);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }

  /**
   * method get
   * api /sys/priv/privs
   * @param req
   * @param res
   * @param next
   */
  getPrivs() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let roles = yield privilegeService.getPrivs(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(roles);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }

  /**
   * method get
   * api /sys/priv/rootPrivs
   * @param req
   * @param res
   * @param next
   */
  getRootPrivs() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        let rootPrivs = yield privilegeService.getRootPrivs();
        connection.release();
        result.setResult(rootPrivs);
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }


  /**
   * method post
   * api /sys/priv/add
   * @param req
   * @param res
   * @param next
   */
  addPriv() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let privsInfo = req.body;
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        yield privilegeService.addPriv(privsInfo);
        connection.release();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }

  /**
   * method post
   * api /sys/priv/update
   * @param req
   * @param res
   * @param next
   */
  updatePriv() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let privsInfo = req.body;
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let privilegeService = new PrivilegeService(connection);
        yield privilegeService.updatePriv(privsInfo);
        connection.release();
        res.json(result);
      } catch (error) {
        if (connection) {
          connection.release();
        }
        if (error.type === 'user') {
          result.setSuccess(false);
          result.setErrorCode(error.code);
          result.setErrorMessage(error.message);
          res.json(result);
        } else {
          next(error);
        }
      }
    });
  }

  /**
   * method post
   * api /sys/priv/delete/:id
   * @param req
   * @param res
   * @param next
   */
  deletePrivById() {
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
          let privilegeService = new PrivilegeService(connection);
          yield privilegeService.deletePrivById(requestData.id);
          connection.release();
          res.json(result);
        } catch (error) {
          if (connection) {
            connection.release();
          }
          if (error.type === 'user') {
            result.setSuccess(false);
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
            res.json(result);
          } else {
            next(error);
          }
        }
      } else {
        let msg = illegalMsg[0];
        next(self.parameterError(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }

  /**
   * method get
   * api /sys/priv/rolepriv
   * @param req
   * @param res
   * @param next
   */
  getPrivsByRoleId() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let roles = {
        roleId: {type: 'number', required: true}
      };
      let requestData = {
        roleId: parseInt(req.query.roleId)
      };
      let illegalMsg = self.validate(roles, requestData);
      if (illegalMsg === undefined) {
        let pagingModel = self.paging(query.pageIndex, query.pageSize, {
          pageSize: 20
        });
        let result = self.result();
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let privilegeService = new PrivilegeService(connection);
          let privs = yield privilegeService.getPrivsByRoleId(requestData.roleId, pagingModel.start, pagingModel.offset);
          connection.release();
          result.setResult(privs);
          res.json(result);
        } catch (error) {
          if (connection) {
            connection.release();
          }
          if (error.type === 'user') {
            result.setSuccess(false);
            result.setErrorCode(error.code);
            result.setErrorMessage(error.message);
            res.json(result);
          } else {
            next(error);
          }
        }
      } else {
        let msg = illegalMsg[0];
        next(self.parameterError(msg.field + ' ' + msg.message, msg.code));
      }
    });
  }
};

function createMenu(menus) {
  let directory = [];
  let menuMap = {};
  for (let k = 0, len = menus.length; k < len; k++) {
    let menu = menus[k];
    if (menu['TYPE'] === 0) {
      directory.push({
        id: menu['PRIV_ID'],
        name: menu['PRIV_NAME']
      });
    } else if (menu['TYPE'] === 1) {
      if (menuMap[menu['PARENT_PRIV_ID']] === undefined) {
        menuMap[menu['PARENT_PRIV_ID']] = [];
      }
      menuMap[menu['PARENT_PRIV_ID']].push({
        id: menu['PRIV_ID'],
        name: menu['PRIV_NAME'],
        url: menu['URL'],
        path: menu['PATH']
      });
    }
  }
  for (let j = 0, len = directory.length; j < len; j++) {
    directory[j]['children'] = menuMap[directory[j]['id']];
  }
  return directory;
}
