/**
 * Created by xiaobxia on 2017/7/25.
 */
const co = require('co');
const moment = require('moment');
const BaseService = require('./base');
const FileBucketORM = require('../model/orm/sys/fileBucketORM');

module.exports = class FileBucketService extends BaseService {
  getAllBucket() {
    let self = this;
    let fn = co.wrap(function*() {
      let connection = self.getConnection();
      let fileBucketORM = new FileBucketORM(connection);
      let result = yield fileBucketORM.getAllBucket();
      let buckets = fileBucketORM.dataToHump(result);
      buckets.sort(function (a, b) {
        return b.bucketId - a.bucketId;
      });
      return buckets;
    });
    return fn();
  }

  addBucket(bucketInfo) {
    let self = this;
    let fn = co.wrap(function*(bucketInfo) {
      let connection = self.getConnection();
      let fileBucketORM = new FileBucketORM(connection);
      let result = yield fileBucketORM.checkExistByCode(bucketInfo.bucketCode);
      if (result.length === 0) {
        delete bucketInfo.bucketId;
        bucketInfo.isPublic = bucketInfo.isPublic === 'true' ? 1 : 0;
        let data = fileBucketORM.dataToHyphen(bucketInfo);
        yield fileBucketORM.addBucket(data);
      } else {
        self.throwBaseError('code已存在', 'BUCKET_CODE_HAS_EXIST');
      }
    });
    return fn(bucketInfo);
  }

  updateBucketById(bucketInfo) {
    let self = this;
    let fn = co.wrap(function*(bucketInfo) {
      let connection = self.getConnection();
      let fileBucketORM = new FileBucketORM(connection);
      let id = bucketInfo.bucketId;
      delete bucketInfo.bucketId;
      bucketInfo.isPublic = bucketInfo.isPublic === 'true' ? 1 : 0;
      let data = fileBucketORM.dataToHyphen(bucketInfo);
      data['UPDATE_DATE'] = moment().format('YYYY-M-D HH:mm:ss');
      yield fileBucketORM.updateBucketById(id, data);
    });
    return fn(bucketInfo);
  }

  deleteBucketById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let fileBucketORM = new FileBucketORM(connection);
      let result = yield fileBucketORM.deleteBucketById(id);
      if (result.affectedRows === 0) {
        self.throwBaseError('不可删除', 'BUCKET_NOT_EXIST');
      }
    });
    return fn(id);
  }

  getBucketById(id) {
    let self = this;
    let fn = co.wrap(function*(id) {
      let connection = self.getConnection();
      let fileBucketORM = new FileBucketORM(connection);
      let result = yield fileBucketORM.getBucketById(id);
      self.checkDBResult(result, '不存在的文件桶', 'BUCKET_NOT_EXIST');
      return fileBucketORM.dataToHump(result)[0];
    });
    return fn(id);
  }
};
