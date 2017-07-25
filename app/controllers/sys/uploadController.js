/**
 * Created by xiaobxia on 2017/7/24.
 */
const co = require('co');
const BaseController = require('../base');
const FileService = require('../../service/fileService');

module.exports = class UploadController extends BaseController {
  /**
   * method get
   * api sys/upload/files
   * @param req
   * @param res
   * @param next
   */
  showFiles() {
    let self = this;
    return co.wrap(function*(req, res, next) {
      let query = req.query;
      let pagingModel = self.paging(query.pageIndex, query.pageSize);
      let result = self.result();
      let connection = null;
      try {
        connection = yield self.getPoolConnection();
        let fileService= new FileService(connection);
        let files = yield fileService.showFiles(pagingModel.start, pagingModel.offset);
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
};
