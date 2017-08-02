/**
 * Created by xiaobxia on 2017/7/31.
 */
const co = require('co');
const BaseController = require('../base');
const AppVersionService = require('../../service/sys/appVersionService');

module.exports = class AppVersionController extends BaseController {
  /**
   * method get
   * api /sys/appversion/versionsCount
   * @param req
   * @param res
   * @param next
   */
  getAppVersionsCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let appVersionService = new AppVersionService(connection);
        let count = yield appVersionService.getAppVersionsCount();
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
   * api /sys/appversion/versions
   * @param req
   * @param res
   * @param next
   */
  getAppVersions() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let appVersionService = new AppVersionService(connection);
        let appVersions = yield appVersionService.getAppVersions(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(appVersions);
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
   * api /sys/appversion/add
   * @param req
   * @param res
   * @param next
   */
  addAppVersions() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          appId: parseInt(req.body.appId),
          versionNumber: req.body.versionNumber,
          forceUpdate: req.body.forceUpdate,
          downloadPath: req.body.downloadPath,
          versionDesc: req.body.versionDesc
        };
        self.validate(
          {
            appId: {required: true, type: 'number'},
            forceUpdate: {required: true, type: 'string'},
            versionNumber: {required: true, type: 'string'},
            downloadPath: {required: true, type: 'string'},
            versionDesc: {required: true, type: 'string'}
          },
          requestData
        );
        connection = yield self.getPoolConnection();
        let appVersionService = new AppVersionService(connection);
        yield appVersionService.addAppVersion(req.body);
        connection.release();
        let result = self.result();
        result.setResult(req.body);
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
   * api /sys/appversion/update
   * @param req
   * @param res
   * @param next
   */
  updateAppVersion() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let versionInfo = req.body;
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let appVersionService = new AppVersionService(connection);
        yield appVersionService.updateAppVersion(versionInfo);
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
   * api /sys/appversion/delete/:id
   * @param req
   * @param res
   * @param next
   */
  deleteAppVersionById() {
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
        let appVersionService = new AppVersionService(connection);
        yield appVersionService.deleteAppVersionById(requestData.id);
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
