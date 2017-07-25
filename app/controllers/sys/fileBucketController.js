/**
 * Created by xiaobxia on 2017/7/25.
 */
const co = require('co');
const BaseController = require('../base');
const FileBucketService = require('../../service/fileBucketService');

module.exports = class FileBucketController extends BaseController {
  /**
   * method get
   * api sys/fileBucket/list
   * @param req
   * @param res
   * @param next
   */
  getAllBuckets() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileBucketService= new FileBucketService(connection);
        let buckets = yield fileBucketService.getAllBucket();
        connection.release();
        result.setResult(buckets);
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
   * api sys/fileBucket/add
   * @param req
   * @param res
   * @param next
   */
  addBucket() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let requestData = {
        bucketCode: req.body.bucketCode,
        bucketName: req.body.bucketName,
        isPublic: req.body.isPublic,
        hostName: req.body.hostName
      };
      let illegalMsg = self.validate(
        {
          bucketCode: {required: true, type: 'string'},
          bucketName: {required: true, type: 'string'},
          isPublic: {required: true, type: 'string'},
          hostName: {required: true, type: 'string'}
        },
        requestData
      );
      let result = self.result();
      if (illegalMsg === undefined) {
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let fileBucketService= new FileBucketService(connection);
          yield fileBucketService.addBucket(req.body);
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
   * method post
   * api /sys/fileBucket/update
   * @param req
   * @param res
   * @param next
   */
  updateBucket() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let bucketInfo = req.body;
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileBucketService= new FileBucketService(connection);
        yield fileBucketService.updateBucketById(bucketInfo);
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
   * method delete
   * api /sys/fileBucket/:id
   * @param req
   * @param res
   * @param next
   */
  deleteRoleById() {
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
          let fileBucketService= new FileBucketService(connection);
          yield fileBucketService.deleteBucketById(requestData.id);
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
