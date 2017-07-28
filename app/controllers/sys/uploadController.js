/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const BaseController = require('../base');
const FileService = require('../../service/fileService');
const FileBucketService = require('../../service/fileBucketService');
const ParamService = require('../../service/paramService');
const qiniu = require('../../common/qiniu');
const getQiniuToken = qiniu.getUploadToken;
const getPublicDownloadUrl = qiniu.getPublicDownloadUrl;

module.exports = class UploadController extends BaseController {
  /**
   * method get
   * api sys/upload/files
   * @param req
   * @param res
   * @param next
   */
  getFiles() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let files = yield fileService.getFiles(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(files);
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
   * api sys/upload/filesCount
   * @param req
   * @param res
   * @param next
   */
  getFilesCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let count = yield fileService.getFilesCount();
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
   * api sys/upload/token
   * @param req
   * @param res
   * @param next
   */
  getUploadToken() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let requestData = {
        suffix: query.suffix,
        bucketId: parseInt(query.bucketId)
      };
      let illegalMsg = self.validate({
        suffix: {required: true, type: 'string'},
        bucketId: {required: true, type: 'number'}
      }, requestData);
      if (illegalMsg === undefined) {
        let result = self.result();
        let connection = null;
        try {
          connection = yield self.getPoolConnection();
          let paramService = new ParamService(connection);
          let fileBucketService = new FileBucketService(connection);
          let bucket = fileBucketService.getBucketById(requestData.bucketId);
          let accessParam = paramService.getParamByCode('QINIU_ACCESS_KEY');
          let secretParam = paramService.getParamByCode('QINIU_SECRET_KEY');
          let dbresult = yield [bucket, accessParam, secretParam];
          let config = {
            bucketCode: dbresult[0].bucketCode,
            accessKey: dbresult[1].paramValue,
            secretKey: dbresult[2].paramValue,
            bucketHost: dbresult[0].hostName,
            fileName: md5(uuidv4()) + '.' + requestData.suffix
          };
          let tokenModel = getQiniuToken(config);
          connection.release();
          result.setResult(tokenModel);
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
   * api sys/upload/save
   * @param req
   * @param res
   * @param next
   */
  addFile() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        yield fileService.addFile(req.body);
        connection.release();
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
   * method get
   * api sys/upload/priv/:id
   * @param req
   * @param res
   * @param next
   */
  //其实得到的是公有链接
  getFilePrivUrl() {
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
          let paramService = new ParamService(connection);
          let fileService = new FileService(connection);
          let accessParam = paramService.getParamByCode('QINIU_ACCESS_KEY');
          let secretParam = paramService.getParamByCode('QINIU_SECRET_KEY');
          let file = fileService.getFileById(requestData.id);
          let dbresult = yield [accessParam, secretParam, file];
          let fileName = dbresult[2].fileName;
          let bucketDomain = dbresult[2].fileUrl.replace('/' + fileName, '');
          let downloadUrl = getPublicDownloadUrl({
            accessKey: dbresult[0].paramValue,
            secretKey: dbresult[1].paramValue,
            fileName: fileName,
            bucketDomain: bucketDomain
          });
          connection.release();
          result.setResult(downloadUrl);
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
   * method get
   * api sys/upload/pictures
   * @param req
   * @param res
   * @param next
   */
  getPictures() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let pictures = yield fileService.getPictures(pagingModel.start, pagingModel.offset);
        connection.release();
        result.setResult(pictures);
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
   * api sys/upload/picturesCount
   * @param req
   * @param res
   * @param next
   */
  getPicturesCount() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let count = yield fileService.getPicturesCount();
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
   * api sys/upload/searchFile
   * @param req
   * @param res
   * @param next
   */
  //只有搜索图片的功能
  getPicturesBySearch() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let pictures = null;
        //如果文件名为空就是搜索全部
        if (query.fileName) {
          pictures = yield fileService.getPicturesBySearchFileName(query.fileName, pagingModel.start, pagingModel.offset);
        } else {
          pictures = yield fileService.getPictures(pagingModel.start, pagingModel.offset);
        }
        connection.release();
        result.setResult(pictures);
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
   * api sys/upload/searchFileCount
   * @param req
   * @param res
   * @param next
   */
  getPicturesCountBySearch() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let connection = null;
      let result = self.result();
      try {
        connection = yield self.getPoolConnection();
        let fileService = new FileService(connection);
        let count = null;
        let fileName = req.query.fileName;
        if (fileName) {
          count = yield fileService.getPicturesCountBySearchFileName(fileName);
        } else {
          count = yield fileService.getPicturesCount();
        }
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
};
