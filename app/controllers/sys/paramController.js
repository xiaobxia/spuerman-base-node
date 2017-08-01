/**
 * Created by xiaobxia on 2017/7/25.
 */
const co = require('co');
const BaseController = require('../base');
const ParamService = require('../../service/paramService');

module.exports = class ParamController extends BaseController {
  /**
   * method get
   * api /sys/param/params
   * @param req
   * @param res
   * @param next
   */
  getParams() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let paramService = new ParamService(connection);
        let params = yield paramService.getParams(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(params);
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
   * api /sys/param/paramsCount
   * @param req
   * @param res
   * @param next
   */
  getParamsCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let paramService = new ParamService(connection);
        let count = yield paramService.getParamsCount();
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
   * method post
   * api /sys/param/add
   * @param req
   * @param res
   * @param next
   */
  addParam() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      try {
        let requestData = {
          paramCode: req.body.paramCode,
          paramValue: req.body.paramValue,
          description: req.body.description
        };
        self.validate(
          {
            paramCode: {required: true, type: 'string'},
            paramValue: {required: true, type: 'string'},
            description: {required: true, type: 'string'}
          },
          requestData
        );
        connection = yield self.getPoolConnection();
        let paramService = new ParamService(connection);
        let paramId = yield paramService.addParam(req.body);
        let param = yield paramService.getParamById(paramId);
        let result = self.result();
        result.setResult(param)
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
   * method post
   * api /sys/param/update
   * @param req
   * @param res
   * @param next
   */
  updateParam() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let bucketInfo = req.body;
      let connection = null;
      try {
        let requestData = {
          id: parseInt(req.body.id),
          paramCode: req.body.paramCode,
          paramValue: req.body.paramValue,
          description: req.body.description
        };
        self.validate(
          {
            id: {required: true, type: 'number'},
            paramCode: {required: true, type: 'string'},
            paramValue: {required: true, type: 'string'},
            description: {required: true, type: 'string'}
          },
          requestData
        );
        connection = yield self.getPoolConnection();
        let paramService = new ParamService(connection);
        yield paramService.updateParamById(bucketInfo);
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
   * api /sys/param/:id
   * @param req
   * @param res
   * @param next
   */
  deleteParamById() {
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
        let paramService = new ParamService(connection);
        yield paramService.deleteParamById(requestData.id);
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
