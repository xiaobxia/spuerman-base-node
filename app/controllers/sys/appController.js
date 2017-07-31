/**
 * Created by xiaobxia on 2017/7/28.
 */
const co = require('co');
const BaseController = require('../base');
const AppService = require('../../service/appService');

module.exports = class AppController extends BaseController {
  /**
   * method get
   * api sys/app/apps
   * @param req
   * @param res
   * @param next
   */
  getAllApps() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let appService = new AppService(connection);
        let apps = yield appService.getAllApps();
        connection.release();
        result.setResult(apps);
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
   * api sys/app/add
   * @param req
   * @param res
   * @param next
   */
  addApp() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let requestData = {
        appCode: req.body.appCode,
        appName: req.body.appName,
        appType: parseInt(req.body.appType),
        description: req.body.description
      };
      let illegalMsg = self.validate(
        {
          appCode: {required: true, type: 'string'},
          appName: {required: true, type: 'string'},
          appType: {required: true, type: 'number'},
          description: {required: true, type: 'string'}
        },
        requestData
      );
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let appService = new AppService(connection);
          let appId = yield appService.addApp(req.body);
          let app = yield appService.getAppById(appId);
          connection.release();
          result.setResult(app);
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
   * method post
   * api /sys/app/update
   * @param req
   * @param res
   * @param next
   */
  updateApp() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let appInfo = req.body;
      let requestData = {
        appId: parseInt(req.body.appId),
        appCode: req.body.appCode,
        appName: req.body.appName,
        appType: parseInt(req.body.appType),
        description: req.body.description
      };
      let illegalMsg = self.validate(
        {
          appId: {required: true, type: 'number'},
          appCode: {required: true, type: 'string'},
          appName: {required: true, type: 'string'},
          appType: {required: true, type: 'number'},
          description: {required: true, type: 'string'}
        },
        requestData
      );
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let appService = new AppService(connection);
          yield appService.updateAppById(appInfo);
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
   * api /sys/app/delete/:id
   * @param req
   * @param res
   * @param next
   */
  deleteAppById() {
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
          let appService = new AppService(connection);
          yield appService.deleteAppById(requestData.id);
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
